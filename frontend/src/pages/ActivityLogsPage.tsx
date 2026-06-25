import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { 
  Search, Calendar, Filter, Download, 
  Mail, MailOpen, MousePointerClick, UserPlus, Sparkles, AlertCircle, CheckCircle2, Server
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Mock Data for Charts
const eventFrequencyData = [
  { time: '09:00', events: 120 },
  { time: '10:00', events: 250 },
  { time: '11:00', events: 340 },
  { time: '12:00', events: 180 },
  { time: '13:00', events: 420 },
  { time: '14:00', events: 390 },
  { time: '15:00', events: 510 },
  { time: '16:00', events: 210 },
  { time: '17:00', events: 150 },
];

// Mock Data for Timeline
const activityLogs = [
  {
    id: 'evt-1001',
    timestamp: '2023-10-27T15:42:10Z',
    type: 'Lead Submitted',
    status: 'success',
    actor: 'System',
    details: 'New lead "Sarah Connor" received via website form.',
    metadata: { source: 'organic', ip: '192.168.1.42' },
    icon: UserPlus,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    id: 'evt-1002',
    timestamp: '2023-10-27T15:42:15Z',
    type: 'AI Classification',
    status: 'success',
    actor: 'LeadFlow AI',
    details: 'Classified lead as "High Priority" with 94% confidence.',
    metadata: { category: 'Enterprise', score: 0.94 },
    icon: Sparkles,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10'
  },
  {
    id: 'evt-1003',
    timestamp: '2023-10-27T15:45:00Z',
    type: 'Email Sent',
    status: 'success',
    actor: 'Workflow Engine',
    details: 'Sent "Enterprise Welcome Series: Email 1" to sarah@cyberdyne.com',
    metadata: { template_id: 'tpl_ent_welcome_1', provider: 'SendGrid' },
    icon: Mail,
    color: 'text-slate-300',
    bgColor: 'bg-slate-700'
  },
  {
    id: 'evt-1004',
    timestamp: '2023-10-27T16:12:33Z',
    type: 'Email Opened',
    status: 'info',
    actor: 'sarah@cyberdyne.com',
    details: 'Email "Enterprise Welcome Series: Email 1" was opened.',
    metadata: { device: 'Desktop', client: 'Outlook' },
    icon: MailOpen,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10'
  },
  {
    id: 'evt-1005',
    timestamp: '2023-10-27T16:14:05Z',
    type: 'Link Clicked',
    status: 'info',
    actor: 'sarah@cyberdyne.com',
    details: 'Clicked link: "View Product Demo" in email.',
    metadata: { url: '/demo', utm_campaign: 'welcome_series' },
    icon: MousePointerClick,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  },
  {
    id: 'evt-1006',
    timestamp: '2023-10-27T16:20:12Z',
    type: 'System Error',
    status: 'error',
    actor: 'Integration Worker',
    details: 'Failed to sync lead data to Salesforce CRM. Retrying...',
    metadata: { error_code: 'ERR_TIMEOUT', attempt: 1 },
    icon: AlertCircle,
    color: 'text-rose-400',
    bgColor: 'bg-rose-400/10'
  },
  {
    id: 'evt-1007',
    timestamp: '2023-10-27T16:25:00Z',
    type: 'System Retry',
    status: 'success',
    actor: 'Integration Worker',
    details: 'Successfully synced lead data to Salesforce CRM on attempt 2.',
    metadata: { duration_ms: 450, attempt: 2 },
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10'
  }
];

interface ActivityLogsPageProps {
  onNavigate?: (view: string) => void;
}

export function ActivityLogsPage({ onNavigate }: ActivityLogsPageProps = {}) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('activity');
  const [searchTerm, setSearchTerm] = useState('');

  // Datadog/Grafana inspired dark theme colors
  const theme = {
    bgMain: 'bg-[#0f172a]', // Slate 900
    bgPanel: 'bg-[#1e293b]', // Slate 800
    bgInput: 'bg-[#0f172a]', 
    border: 'border-slate-700',
    textMain: 'text-slate-200',
    textMuted: 'text-slate-400',
    accent: '#3b82f6', // Blue 500
  };

  return (
    <div className={`flex h-screen ${theme.bgMain} overflow-hidden font-mono ${theme.textMain}`}>
      <Sidebar activeItem={activeSidebarItem} onNavigate={(item) => {
        setActiveSidebarItem(item);
        onNavigate?.(item);
      }} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                <Server className="w-5 h-5 mr-2 text-blue-500" />
                Monitoring & Audit Logs
              </h1>
              <p className={`text-sm ${theme.textMuted} mt-1 font-sans`}>
                Real-time observability dashboard for system events and lead tracking.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className={`${theme.bgPanel} border ${theme.border} hover:bg-slate-700 px-3 py-1.5 rounded text-sm flex items-center transition-colors`}>
                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                Last 24 Hours
              </button>
              <button className={`bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 px-3 py-1.5 rounded text-sm flex items-center transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]`}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className={`${theme.bgPanel} border ${theme.border} rounded-lg p-3 flex flex-col md:flex-row gap-3 items-center shadow-lg`}>
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 ${theme.textMuted}`} />
              </div>
              <input
                type="text"
                className={`block w-full pl-10 pr-3 py-2 border ${theme.border} rounded-md leading-5 ${theme.bgInput} ${theme.textMain} placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors`}
                placeholder="Search logs by query (e.g., status:error actor:System)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select className={`block w-full pl-3 pr-8 py-2 text-sm border ${theme.border} rounded-md leading-5 ${theme.bgInput} ${theme.textMain} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}>
                <option>All Event Types</option>
                <option>Lead Events</option>
                <option>Email Events</option>
                <option>System Events</option>
              </select>
              <button className={`p-2 border ${theme.border} rounded-md ${theme.bgInput} hover:bg-slate-700 transition-colors`} title="More Filters">
                <Filter className={`h-4 w-4 ${theme.textMuted}`} />
              </button>
            </div>
          </div>

          {/* Chart Section */}
          <div className={`${theme.bgPanel} border ${theme.border} rounded-lg p-4 shadow-lg`}>
            <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${theme.textMuted}`}>Event Frequency (Last 24h)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventFrequencyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '6px', color: '#f8fafc' }}
                    itemStyle={{ color: '#60a5fa' }}
                    cursor={{fill: '#334155', opacity: 0.4}}
                  />
                  <Bar dataKey="events" fill="#3b82f6" radius={[2, 2, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Logs Table / Timeline */}
          <div className={`${theme.bgPanel} border ${theme.border} rounded-lg shadow-lg overflow-hidden flex flex-col`}>
            <div className={`p-4 border-b ${theme.border} flex justify-between items-center bg-slate-800/80`}>
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${theme.textMuted}`}>Live Event Stream</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-emerald-400">Live</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className={`bg-[#0f172a]/50 text-slate-400 text-xs font-semibold uppercase border-b ${theme.border}`}>
                  <tr>
                    <th className="px-4 py-3 font-medium">Timestamp</th>
                    <th className="px-4 py-3 font-medium">Level</th>
                    <th className="px-4 py-3 font-medium">Event Type</th>
                    <th className="px-4 py-3 font-medium">Message</th>
                    <th className="px-4 py-3 font-medium">Actor</th>
                  </tr>
                </thead>
                <tbody className={`divide-y divide-slate-700/50`}>
                  {activityLogs.map((log) => (
                    <tr 
                      key={log.id} 
                      className="hover:bg-slate-700/30 transition-colors font-mono text-[13px]"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString([], {hour12: false})}
                        <span className="text-slate-600 ml-1 text-[11px]">.{new Date(log.timestamp).getMilliseconds().toString().padStart(3, '0')}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase
                          ${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                            log.status === 'error' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}
                        >
                          {log.status === 'success' ? 'INFO' : log.status === 'error' ? 'ERROR' : 'DEBUG'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-1 rounded mr-2 ${log.bgColor}`}>
                            <log.icon className={`w-3.5 h-3.5 ${log.color}`} />
                          </div>
                          <span className="text-slate-200">{log.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-slate-300">{log.details}</span>
                        <div className="text-[11px] text-slate-500 mt-1 truncate max-w-md">
                          {JSON.stringify(log.metadata)}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-400">
                        {log.actor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Mock */}
            <div className={`p-3 border-t ${theme.border} flex items-center justify-between bg-slate-800/80`}>
              <div className="text-xs text-slate-500">Showing 1-7 of 1,204 logs</div>
              <div className="flex gap-1">
                <button className={`px-2 py-1 text-xs rounded border ${theme.border} ${theme.bgInput} text-slate-400 disabled:opacity-50`} disabled>Prev</button>
                <button className={`px-2 py-1 text-xs rounded border ${theme.border} ${theme.bgInput} hover:bg-slate-700 text-slate-200 transition-colors`}>Next</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
