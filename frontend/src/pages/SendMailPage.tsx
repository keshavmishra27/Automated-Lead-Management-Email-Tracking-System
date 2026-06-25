import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Send, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface SendMailPageProps {
  onNavigate?: (view: string) => void;
}

export function SendMailPage({ onNavigate }: SendMailPageProps = {}) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('send-mail');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toEmail || !subject || !body) return;

    setStatus('sending');
    try {
      const response = await fetch('http://localhost:8000/api/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: toEmail,
          subject: subject,
          body: body,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send email');
      }

      setStatus('success');
      setToEmail('');
      setSubject('');
      setBody('');
      
      // Reset success state after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unknown error occurred');
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar activeItem={activeSidebarItem} onNavigate={(item) => {
        setActiveSidebarItem(item);
        onNavigate?.(item);
      }} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <Send className="w-6 h-6 mr-3 text-blue-600" />
              Send Email (SMTP)
            </h1>
            <p className="text-slate-500 mt-1">Compose and send emails directly through your configured mail server.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <form onSubmit={handleSend} className="space-y-6">
              {/* To Email */}
              <div>
                <label htmlFor="toEmail" className="block text-sm font-semibold text-slate-700 mb-2">
                  Recipient (To)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="toEmail"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 transition-colors"
                    placeholder="prospect@company.com"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 transition-colors"
                  placeholder="Following up on our discussion"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={status === 'sending'}
                />
              </div>

              {/* Body */}
              <div>
                <label htmlFor="body" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message Body
                </label>
                <textarea
                  id="body"
                  required
                  rows={8}
                  className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 transition-colors resize-y"
                  placeholder="Hi there,&#10;&#10;I wanted to reach out regarding..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  disabled={status === 'sending'}
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-emerald-800">Email sent successfully!</h3>
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-lg bg-rose-50 p-4 border border-rose-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-rose-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-rose-800">Failed to send email</h3>
                      <div className="mt-2 text-sm text-rose-700">
                        <p>{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={status === 'sending' || !toEmail || !subject || !body}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="-ml-1 mr-2 h-5 w-5" />
                      Send Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
