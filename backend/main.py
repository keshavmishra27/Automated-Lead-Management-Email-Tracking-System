from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
import re
import os
from dotenv import load_dotenv
from groq import Groq
import smtplib
import imaplib
import email
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import decode_header
from typing import List

load_dotenv(dotenv_path="../.env") # Load from root
GROK_API_KEY = os.getenv("GROK_API_KEY")

def get_mail_credentials():
    load_dotenv(dotenv_path="../.env", override=True)
    return os.getenv("MAIL"), os.getenv("APP_PASSWORD")


groq_client = None
if GROK_API_KEY:
    groq_client = Groq(api_key=GROK_API_KEY)
# --- Database Setup ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./leads.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DBLead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, index=True)
    phone_number = Column(String, nullable=True)
    company_name = Column(String, nullable=True)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# --- Pydantic Models ---
class LeadCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone_number: str | None = Field(None, min_length=10, max_length=10)
    company_name: str | None = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=500)

class LeadResponse(LeadCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CopilotRequest(BaseModel):
    actionType: str = Field(..., description="email, pitch, or agenda")
    leadContext: str = Field(..., description="Requirement or summary of the lead")

class CopilotResponse(BaseModel):
    generatedText: str

class EmailSendRequest(BaseModel):
    to_email: EmailStr
    subject: str
    body: str

class EmailMessageItem(BaseModel):
    id: str
    subject: str
    sender: str
    date: str
    snippet: str

# --- FastAPI App ---
app = FastAPI(title="LeadFlow AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev purposes, allow all. In prod use actual frontend origin.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/leads", response_model=LeadResponse)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    if lead.phone_number:
        # Validate phone format (exactly 10 digits)
        if not re.match(r'^\d{10}$', lead.phone_number):
            raise HTTPException(status_code=400, detail="Phone number must be exactly 10 digits")

    db_lead = DBLead(**lead.model_dump())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@app.post("/api/copilot/generate", response_model=CopilotResponse)
def generate_copilot_content(request: CopilotRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key not configured")
        
    system_prompt = "You are an expert AI sales assistant."
    if request.actionType == "email":
        user_prompt = f"Write a short, compelling follow-up email to a lead with this requirement:\n\n{request.leadContext}\n\nKeep it under 150 words and end with a call to action."
    elif request.actionType == "pitch":
        user_prompt = f"Write a quick, punchy 3-sentence elevator pitch tailored to this lead's requirement:\n\n{request.leadContext}"
    elif request.actionType == "agenda":
        user_prompt = f"Create a concise 3-point meeting agenda for a discovery call based on this requirement:\n\n{request.leadContext}"
    else:
        raise HTTPException(status_code=400, detail="Invalid action type")

    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama3-8b-8192",
            temperature=0.7,
            max_tokens=300,
        )
        return CopilotResponse(generatedText=chat_completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate content: {str(e)}")

@app.post("/api/mail/send")
def send_email(request: EmailSendRequest):
    mail_account, app_password = get_mail_credentials()
    if not mail_account or not app_password:
        raise HTTPException(status_code=500, detail="Mail credentials not configured")
    
    try:
        msg = MIMEMultipart()
        msg['From'] = mail_account
        msg['To'] = request.to_email
        msg['Subject'] = request.subject
        msg.attach(MIMEText(request.body, 'plain'))
        
        # Connect to Gmail SMTP
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(mail_account, app_password)
        server.send_message(msg)
        server.quit()
        return {"status": "success", "message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

def decode_mime_words(s):
    if not s:
        return ""
    decoded = decode_header(s)
    res = ""
    for text, charset in decoded:
        if isinstance(text, bytes):
            if charset:
                res += text.decode(charset, errors='ignore')
            else:
                res += text.decode('utf-8', errors='ignore')
        else:
            res += text
    return res

@app.get("/api/mail/inbox", response_model=List[EmailMessageItem])
def get_inbox(limit: int = 10):
    mail_account, app_password = get_mail_credentials()
    if not mail_account or not app_password:
        raise HTTPException(status_code=500, detail="Mail credentials not configured")
        
    try:
        # Connect to Gmail IMAP
        mail = imaplib.IMAP4_SSL('imap.gmail.com')
        mail.login(mail_account, app_password)
        mail.select('inbox')
        
        status, messages = mail.search(None, 'ALL')
        if status != "OK":
            raise Exception("Failed to search inbox")
            
        email_ids = messages[0].split()
        
        # Get latest `limit` emails
        latest_email_ids = email_ids[-limit:]
        latest_email_ids.reverse() # Newest first
        
        inbox_emails = []
        for e_id in latest_email_ids:
            res, msg_data = mail.fetch(e_id, '(RFC822)')
            if res != "OK":
                continue
                
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])
                    subject = decode_mime_words(msg['Subject'])
                    sender = decode_mime_words(msg.get('From', "Unknown"))
                    date = msg.get('Date', "")
                    
                    # Get snippet
                    snippet = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain":
                                try:
                                    snippet = part.get_payload(decode=True).decode()[:100]
                                    break
                                except:
                                    pass
                    else:
                        try:
                            snippet = msg.get_payload(decode=True).decode()[:100]
                        except:
                            pass
                            
                    inbox_emails.append(EmailMessageItem(
                        id=e_id.decode('utf-8'),
                        subject=subject,
                        sender=sender,
                        date=date,
                        snippet=snippet.strip() + "..." if snippet else ""
                    ))
        
        mail.logout()
        return inbox_emails
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch inbox: {str(e)}")
