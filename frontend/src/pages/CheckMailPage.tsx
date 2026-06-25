import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Inbox, Mail, RefreshCw, AlertCircle } from 'lucide-react';

interface CheckMailPageProps {
  onNavigate?: (view: string) => void;
}

interface EmailItem {
  id: str;
  subject: string;
  sender: string;
  date: string;
  snippet: string;
}

export function CheckMailPage({ onNavigate }: CheckMailPageProps = {}) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('check-mail');
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInbox = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/mail/inbox?limit=15');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch inbox');
      }
      const data = await response.json();
      setEmails(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching emails');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeItem={activeSidebarItem} onNavigate={(item) => {
        setActiveSidebarItem(item);
        onNavigate?.(item);
      }} />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="p-8 max-w-5xl mx-auto w-full h-full flex flex-col space-y-6">
          
          {/* Header */}
          <div className="flex justify-between items-end flex-shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                <Inbox className="w-6 h-6 mr-3 text-blue-600" />
                Inbox (IMAP)
              </h1>
              <p className="text-slate-500 mt-1">View incoming emails and prospect replies.</p>
            </div>
            <button 
              onClick={fetchInbox}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="rounded-lg bg-rose-50 p-4 border border-rose-200 flex-shrink-0">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-rose-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-rose-800">Error loading inbox</h3>
                  <div className="mt-1 text-sm text-rose-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inbox List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
            <div className="overflow-y-auto flex-1">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : emails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
                  <Inbox className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium">Your inbox is empty</p>
                  <p className="text-sm mt-1">No emails found in the configured account.</p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {emails.map((email, idx) => (
                    <li key={idx} className="hover:bg-slate-50 transition-colors cursor-pointer p-4 sm:px-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4 mt-1">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-slate-900 truncate pr-4">
                              {email.sender}
                            </p>
                            <p className="text-xs text-slate-500 whitespace-nowrap">
                              {email.date}
                            </p>
                          </div>
                          <p className="text-sm text-slate-800 font-medium truncate mb-1">
                            {email.subject}
                          </p>
                          <p className="text-sm text-slate-500 truncate">
                            {email.snippet}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
