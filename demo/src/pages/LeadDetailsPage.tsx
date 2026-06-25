import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Timeline } from '../components/Timeline';
import { GaugeChart } from '../components/GaugeChart';
import { 
  ArrowLeft, Mail, Phone, Building2, UserCircle, 
  Sparkles, Target, Zap, ShieldAlert, FileText 
} from 'lucide-react';

interface LeadDetailsPageProps {
  onBack: () => void;
  // Normally we would pass lead ID and fetch data, but using mock data for UI
}

// Mock lead data
const mockLead = {
  id: "L-8492",
  name: "Sarah Connor",
  email: "sarah@cyberdyne.sys",
  phone: "+1 (555) 019-8372",
  company: "Cyberdyne Systems",
  status: "Hot Lead",
  createdAt: "Oct 24, 2023 at 10:42 AM",
  message: "We are looking to implement a highly scalable, autonomous security network across all our global facilities. Specifically, we need an AI-driven solution that can predict threats before they happen. What is your SLA on response times, and can your system integrate with legacy military hardware?",
  engagementScore: 88,
  aiAnalysis: {
    category: "Enterprise Security",
    priority: "Urgent",
    summary: "High-value enterprise prospect looking for autonomous AI solutions. Demonstrated high intent by specifically asking about SLAs and legacy integration.",
    suggestedAction: "Schedule a technical deep-dive call with the Solutions Engineering team within 24 hours. Prepare a custom SLA proposal."
  },
  timeline: [
    {
      id: "1",
      type: "sent",
      title: "Initial Outreach Email Sent",
      description: "Automated sequence: Enterprise Welcome Series",
      timestamp: "Oct 24, 2:00 PM"
    },
    {
      id: "2",
      type: "opened",
      title: "Email Opened",
      description: "Opened on Desktop (macOS)",
      timestamp: "Oct 24, 2:15 PM"
    },
    {
      id: "3",
      type: "clicked",
      title: "Link Clicked",
      description: "Clicked: 'View Enterprise SLA Terms'",
      timestamp: "Oct 24, 2:18 PM"
    }
  ] as const
};

export function LeadDetailsPage({ onBack }: LeadDetailsPageProps) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('leads');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar activeItem={activeSidebarItem} onNavigate={setActiveSidebarItem} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Lead Information</h1>
                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {mockLead.status}
                </span>
              </div>
              <p className="text-slate-500 mt-1 text-sm">ID: {mockLead.id} • Added {mockLead.createdAt}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Contact & Requirement */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Contact Information */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                  <h3 className="font-semibold flex items-center text-slate-800">
                    <UserCircle className="w-5 h-5 mr-2 text-slate-400" />
                    Contact Details
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1 flex items-center"><UserCircle className="w-4 h-4 mr-1.5"/> Name</p>
                    <p className="font-medium text-slate-900">{mockLead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1 flex items-center"><Mail className="w-4 h-4 mr-1.5"/> Email</p>
                    <p className="font-medium text-slate-900">{mockLead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1 flex items-center"><Phone className="w-4 h-4 mr-1.5"/> Phone</p>
                    <p className="font-medium text-slate-900">{mockLead.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1 flex items-center"><Building2 className="w-4 h-4 mr-1.5"/> Company</p>
                    <p className="font-medium text-slate-900">{mockLead.company}</p>
                  </div>
                </div>
              </div>

              {/* Requirement Card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                  <h3 className="font-semibold flex items-center text-slate-800">
                    <FileText className="w-5 h-5 mr-2 text-slate-400" />
                    Original Requirement
                  </h3>
                </div>
                <div className="p-6">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-slate-700 leading-relaxed text-sm italic">
                    "{mockLead.message}"
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl border border-indigo-800 shadow-sm overflow-hidden text-white">
                <div className="border-b border-white/10 bg-black/20 px-6 py-4 flex items-center justify-between">
                  <h3 className="font-semibold flex items-center text-indigo-50">
                    <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
                    AI Analysis
                  </h3>
                  <div className="flex gap-2">
                    <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded flex items-center text-xs font-medium">
                      <Target className="w-3 h-3 mr-1.5 text-indigo-300" /> {mockLead.aiAnalysis.category}
                    </span>
                    <span className="bg-rose-500/20 border border-rose-500/30 text-rose-200 px-2.5 py-1 rounded flex items-center text-xs font-medium">
                      <ShieldAlert className="w-3 h-3 mr-1.5 text-rose-400" /> {mockLead.aiAnalysis.priority}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-indigo-200 text-sm font-medium mb-2 uppercase tracking-wider">Executive Summary</h4>
                    <p className="text-indigo-50 leading-relaxed text-sm">
                      {mockLead.aiAnalysis.summary}
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                    <h4 className="text-emerald-400 text-sm font-medium mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-1.5" /> Suggested Next Action
                    </h4>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {mockLead.aiAnalysis.suggestedAction}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Score & Timeline */}
            <div className="space-y-6">
              
              {/* Engagement Score */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                  <h3 className="font-semibold text-slate-800">Engagement Score</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <GaugeChart value={mockLead.engagementScore} />
                  <p className="text-center text-sm text-slate-500 mt-4">
                    Based on email opens, link clicks, and time spent reviewing materials.
                  </p>
                </div>
              </div>

              {/* Email Tracking Timeline */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">Activity Timeline</h3>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Live</span>
                </div>
                <div className="p-6">
                  <Timeline events={[...mockLead.timeline]} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
