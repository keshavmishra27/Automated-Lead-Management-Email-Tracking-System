import React, { useState } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface LeadCaptureFormProps {
  onSubmitSuccess?: (data?: any) => void;
}

export const LeadCaptureForm = ({ onSubmitSuccess }: LeadCaptureFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    company_name: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone_number) {
      if (!/^\d{10}$/.test(formData.phone_number)) {
        newErrors.phone_number = "Phone number must be exactly 10 digits";
      }
    }

    if (formData.company_name && formData.company_name.length > 100) {
      newErrors.company_name = "Company name must be at most 100 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 500) {
      newErrors.message = "Message must be at most 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch('http://localhost:8000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number || null,
          company_name: formData.company_name || null,
          message: formData.message
        }),
      });

      if (!response.ok) {
        let errorMsg = 'Failed to submit inquiry';
        try {
            const errorData = await response.json();
            if (Array.isArray(errorData.detail)) {
               errorMsg = errorData.detail[0].msg;
            } else if (errorData.detail) {
               errorMsg = errorData.detail;
            }
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      } else {
        setIsSuccess(true);
      }
    } catch (error: any) {
      setApiError(error.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-canvas-elevated p-xl border border-hairline flex flex-col items-center justify-center text-center gap-md min-h-[480px]"
      >
        <div className="w-16 h-16 rounded-full border border-semantic-success flex items-center justify-center text-semantic-success text-[26px] mb-xs">
          ✓
        </div>
        <h3 className="text-[26px] font-medium leading-[1.5] text-ink">Inquiry Received</h3>
        <p className="text-body text-[14px]">
          Thank you for reaching out. A representative will contact you shortly to discuss your requirements.
        </p>
        <Button className="mt-sm" onClick={() => { 
          setIsSuccess(false); 
          setFormData({ full_name: '', email: '', phone_number: '', company_name: '', message: '' });
        }}>Submit Another</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-canvas-elevated p-lg sm:p-xl border border-hairline flex flex-col gap-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <Input 
          label="Full Name *" 
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          error={errors.full_name}
          placeholder="Enzo Ferrari" 
        />
        <Input 
          label="Email Address *" 
          name="email"
          type="email" 
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="enzo@ferrari.com" 
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <Input 
          label="Phone Number" 
          name="phone_number"
          type="tel" 
          value={formData.phone_number}
          onChange={handleChange}
          error={errors.phone_number}
          maxLength={10}
          placeholder="5550000000" 
        />
        <Input 
          label="Company Name" 
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          error={errors.company_name}
          placeholder="Scuderia Ferrari" 
        />
      </div>
      <div className="flex flex-col gap-xxxs">
        <Textarea 
          label="Requirement / Message *" 
          name="message"
          placeholder="Please describe your interest or specific requirements..." 
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          maxLength={500}
        />
        <div className="text-right text-[12px] text-muted-soft">
          {formData.message.length} / 500
        </div>
      </div>
      
      {apiError && (
        <div className="p-sm border border-semantic-warning bg-canvas text-semantic-warning text-[14px] mt-xs">
          {apiError}
        </div>
      )}

      <div className="pt-sm border-t border-hairline mt-xs">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? 'Processing...' : 'Submit Inquiry'}
        </Button>
      </div>
    </form>
  );
};
