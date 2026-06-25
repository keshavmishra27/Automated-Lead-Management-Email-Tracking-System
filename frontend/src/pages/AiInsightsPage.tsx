import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { 
  Sparkles, ShieldAlert, Cpu, Activity, BrainCircuit,
  MessageSquare, Presentation, FileText, ChevronRight, Loader2
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';

interface AiInsightsPageProps {
  onNavigate?: (view: string) => void;
}

// Mock Data for AI Leads
const aiLeads = [
  {
    id: "L-8492",
    name: "Sarah Connor",
    company: "Cyberdyne Systems",
    requirement: "We are looking to implement a highly scalable, autonomous security network across all our global facilities. Specifically, we need an AI-driven solution that can predict threats before they happen. What is your SLA on response times, and can your system integrate with legacy military hardware?",
    category: "Enterprise Security",
    priority: "Urgent",
    summary: "High-value enterprise prospect looking for autonomous AI solutions. Demonstrated high intent by specifically asking about SLAs and legacy integration.",
    suggestedAction: "Schedule a technical deep-dive call with Solutions Engineering."
  },
  {
    id: "L-8493",
    name: "Bruce Wayne",
    company: "Wayne Enterprises",
    requirement: "Need a comprehensive supply chain tracking system for specialized vehicle manufacturing. Security is paramount, and it needs to be completely air-gapped from our main network.",
    category: "Supply Chain",
    priority: "High",
    summary: "Billionaire industrialist seeking highly secure, air-gapped tracking systems. High budget potential.",
    suggestedAction: "Send whitepaper on 'Air-gapped Logistics for Defense Contractors'."
  },
  {
    id: "L-8494",
    name: "Diana Prince",
    company: "Antiquities Dept",
    requirement: "Looking for an artifact cataloging system with basic image recognition capabilities. Budget is somewhat limited as we are a museum.",
    category: "Education/Non-Profit",
    priority: "Low",
    summary: "Museum looking for basic image recognition. Budget constraints noted.",
    suggestedAction: "Enroll in the automated 'Non-profit Tier' nurture sequence."
  }
];

const categoryData = [
  { name: 'Enterprise Security', value: 45 },
  { name: 'Supply Chain', value: 25 },
  { name: 'Education', value: 15 },
  { name: 'Retail', value: 15 },
];

const priorityData = [
  { name: 'Urgent/High', value: 60 },
  { name: 'Medium', value: 30 },
  { name: 'Low', value: 10 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
const PRIORITY_COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

export function AiInsightsPage({ onNavigate }: AiInsightsPageProps) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('ai-insights');
  const [selectedLead, setSelectedLead] = useState(aiLeads[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const handleGenerate = async (actionType: string) => {
    setIsGenerating(true);
    setGeneratedContent(null);
    try {
      const response = await fetch('http://localhost:8000/api/copilot/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actionType,
          leadContext: selectedLead.requirement,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data.generatedText);
    } catch (error) {
      console.error(error);
      setGeneratedContent("Error: Unable to reach AI Copilot backend. Ensure the backend is running and the GROK_API_KEY is set in the .env file.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-300">
      <Sidebar activeItem={activeSidebarItem} onNavigate={(item) => {
        setActiveSidebarItem(item);
        onNavigate?.(item);
      }} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">AI Operations Center</h1>
                <p className="text-slate-400 mt-1 text-sm">Real-time intelligence and automated actions.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Model Online</span>
            </div>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">High Priority</p>
                  <p className="text-3xl font-bold text-white mt-2">124</p>
                </div>
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Medium Priority</p>
                  <p className="text-3xl font-bold text-white mt-2">86</p>
                </div>
                <Activity className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Low Priority</p>
                  <p className="text-3xl font-bold text-white mt-2">45</p>
                </div>
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column: Leads & Charts */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Category Distribution</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                          {categoryData.map((_entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} itemStyle={{ color: '#e2e8f0' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Priority Distribution</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={priorityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                          {priorityData.map((entry, index) => <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} itemStyle={{ color: '#e2e8f0' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* AI Analysed Leads List */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-[500px]">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
                    Analyzed Leads Inbox
                  </h3>
                </div>
                <div className="overflow-y-auto flex-1 p-4 space-y-4">
                  {aiLeads.map((lead) => (
                    <div 
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setGeneratedContent(null);
                      }}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        selectedLead.id === lead.id 
                          ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                          : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-medium">{lead.name} <span className="text-slate-400 text-sm ml-2">{lead.company}</span></h4>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                          lead.priority === 'Urgent' || lead.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          lead.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {lead.priority}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">AI Summary</span>
                          <p className="text-sm text-slate-300 mt-1 line-clamp-2">{lead.summary}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">{lead.category}</span>
                          <span className="text-xs text-indigo-400 font-medium flex items-center">
                            View Details <ChevronRight className="w-3 h-3 ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: AI Copilot Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg flex flex-col h-full xl:min-h-[800px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="p-5 border-b border-slate-800 bg-slate-900/50 relative z-10">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-indigo-400" />
                  AI Copilot
                </h3>
                <p className="text-xs text-slate-400 mt-1">Select an action for {selectedLead.name}</p>
              </div>

              <div className="p-5 flex-1 flex flex-col space-y-6 relative z-10">
                
                {/* Lead Context */}
                <div>
                  <h4 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Original Requirement</h4>
                  <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 text-sm text-slate-400 italic">
                    "{selectedLead.requirement}"
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Generate Content</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleGenerate('email')}
                      disabled={isGenerating}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-left px-4 py-3 rounded-lg border border-slate-700 flex items-center group transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageSquare className="w-4 h-4 text-indigo-400 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-200">Follow-up Email</span>
                    </button>
                    <button 
                      onClick={() => handleGenerate('pitch')}
                      disabled={isGenerating}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-left px-4 py-3 rounded-lg border border-slate-700 flex items-center group transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Presentation className="w-4 h-4 text-emerald-400 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-200">Sales Pitch (Elevator)</span>
                    </button>
                    <button 
                      onClick={() => handleGenerate('agenda')}
                      disabled={isGenerating}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-left px-4 py-3 rounded-lg border border-slate-700 flex items-center group transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FileText className="w-4 h-4 text-amber-400 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-200">Meeting Agenda</span>
                    </button>
                  </div>
                </div>

                {/* Output Area */}
                <div className="flex-1 flex flex-col min-h-[250px]">
                  <h4 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">AI Output</h4>
                  <div className="flex-1 bg-slate-950 rounded-lg border border-indigo-500/20 p-4 relative">
                    {isGenerating ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <span className="text-sm font-medium animate-pulse">Running neural sequence...</span>
                      </div>
                    ) : generatedContent ? (
                      <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed h-full overflow-y-auto pr-2 custom-scrollbar">
                        {generatedContent}
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 text-center p-6">
                        <Sparkles className="w-8 h-8 mb-3 opacity-50" />
                        <span className="text-sm">Select an action above to generate AI content based on the lead's profile.</span>
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
