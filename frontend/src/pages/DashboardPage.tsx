import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { MetricCard } from '../components/MetricCard';
import { 
  Users, Mail, MailOpen, MousePointerClick, TrendingUp, BarChart3, 
  ArrowRight, ShieldAlert, Sparkles, Filter 
} from 'lucide-react';
import Plot from 'react-plotly.js';

// Mock Data
const metricsData = [
  { title: "Total Leads", value: "2,543", icon: <Users />, trend: { value: 12.5, isPositive: true } },
  { title: "Emails Sent", value: "12,450", icon: <Mail />, trend: { value: 8.2, isPositive: true } },
  { title: "Emails Opened", value: "8,920", icon: <MailOpen />, trend: { value: 5.1, isPositive: true } },
  { title: "Open Rate", value: "71.6%", icon: <TrendingUp />, trend: { value: 2.4, isPositive: true } },
  { title: "Link Clicks", value: "3,240", icon: <MousePointerClick />, trend: { value: 1.2, isPositive: false } },
  { title: "Click Rate", value: "36.3%", icon: <BarChart3 />, trend: { value: 4.1, isPositive: true } },
];

const leadsOverTimeData = [
  { name: 'Mon', leads: 400 },
  { name: 'Tue', leads: 300 },
  { name: 'Wed', leads: 550 },
  { name: 'Thu', leads: 450 },
  { name: 'Fri', leads: 600 },
  { name: 'Sat', leads: 200 },
  { name: 'Sun', leads: 250 },
];

const emailTrendData = [
  { name: 'Week 1', sent: 4000, opened: 2400 },
  { name: 'Week 2', sent: 3000, opened: 1398 },
  { name: 'Week 3', sent: 2000, opened: 1800 },
  { name: 'Week 4', sent: 2780, opened: 2108 },
];

const recentLeads = [
  { id: 1, name: "Sarah Connor", email: "sarah@skynet.com", company: "Cyberdyne", status: "New", priority: "High" },
  { id: 2, name: "Bruce Wayne", email: "bruce@wayneent.com", company: "Wayne Enterprises", status: "Contacted", priority: "Medium" },
  { id: 3, name: "Tony Stark", email: "tony@stark.com", company: "Stark Ind", status: "Meeting Set", priority: "High" },
  { id: 4, name: "Diana Prince", email: "diana@themyscira.gov", company: "Antiquities Dept", status: "New", priority: "Low" },
  { id: 5, name: "Clark Kent", email: "clark@dailyplanet.com", company: "Daily Planet", status: "Lost", priority: "Medium" },
];

interface DashboardPageProps {
  onNavigate?: (view: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps = {}) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar activeItem={activeSidebarItem} onNavigate={(item) => {
        setActiveSidebarItem(item);
        onNavigate?.(item);
      }} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-500 mt-1">Real-time metrics and AI insights for your leads.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                <Filter className="w-4 h-4 mr-2 text-slate-500" />
                Last 7 Days
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Export Report
              </button>
            </div>
          </div>

          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {metricsData.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Leads Over Time */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-semibold mb-6">Leads Acquisition</h3>
              <div className="h-72">
                <Plot
                  data={[
                    {
                      x: leadsOverTimeData.map(d => d.name),
                      y: leadsOverTimeData.map(d => d.leads),
                      type: 'scatter',
                      mode: 'lines',
                      fill: 'tozeroy',
                      fillcolor: 'rgba(59, 130, 246, 0.2)',
                      line: { color: '#3b82f6', width: 3 },
                      name: 'Leads',
                      hoverinfo: 'y+name'
                    }
                  ]}
                  layout={{
                    autosize: true,
                    margin: { t: 10, r: 10, l: 40, b: 30 },
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    xaxis: { showgrid: false, color: '#64748b', fixedrange: true },
                    yaxis: { gridcolor: '#e2e8f0', gridwidth: 1, gridpattern: 'dash', color: '#64748b', fixedrange: true }
                  }}
                  config={{ displayModeBar: false, responsive: true }}
                  style={{ width: '100%', height: '100%' }}
                  useResizeHandler={true}
                />
              </div>
            </div>

            {/* Email Performance */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Email Performance</h3>
              <div className="h-72">
                <Plot
                  data={[
                    {
                      x: emailTrendData.map(d => d.name),
                      y: emailTrendData.map(d => d.sent),
                      type: 'bar',
                      name: 'Sent',
                      marker: { color: '#94a3b8' },
                      hoverinfo: 'y+name'
                    },
                    {
                      x: emailTrendData.map(d => d.name),
                      y: emailTrendData.map(d => d.opened),
                      type: 'bar',
                      name: 'Opened',
                      marker: { color: '#10b981' },
                      hoverinfo: 'y+name'
                    }
                  ]}
                  layout={{
                    barmode: 'group',
                    autosize: true,
                    margin: { t: 10, r: 10, l: 40, b: 40 },
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    xaxis: { showgrid: false, color: '#64748b', fixedrange: true },
                    yaxis: { gridcolor: '#e2e8f0', gridwidth: 1, gridpattern: 'dash', color: '#64748b', fixedrange: true },
                    legend: { orientation: 'h', y: -0.15, x: 0.5, xanchor: 'center', font: { color: '#64748b' } }
                  }}
                  config={{ displayModeBar: false, responsive: true }}
                  style={{ width: '100%', height: '100%' }}
                  useResizeHandler={true}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row: Table & Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Leads</h3>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/50 text-slate-500 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">Name / Email</th>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">AI Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentLeads.map((lead) => (
                      <tr 
                        key={lead.id} 
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        onClick={() => onNavigate?.('lead-details')}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{lead.name}</div>
                          <div className="text-slate-500">{lead.email}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{lead.company}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 
                              lead.status === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                              lead.status === 'Meeting Set' ? 'bg-green-100 text-green-800' :
                              'bg-slate-100 text-slate-800'}`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {lead.priority === 'High' && <ShieldAlert className="w-4 h-4 text-rose-500 mr-2" />}
                            {lead.priority === 'Medium' && <Sparkles className="w-4 h-4 text-amber-500 mr-2" />}
                            <span className={`font-medium
                              ${lead.priority === 'High' ? 'text-rose-600' : 
                                lead.priority === 'Medium' ? 'text-amber-600' : 
                                'text-slate-500'}`}
                            >
                              {lead.priority}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Widgets Column */}
            <div className="space-y-6">
              {/* Engagement Funnel */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Engagement Funnel</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Total Leads</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Opened Email</span>
                      <span className="font-medium">71.6%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '71.6%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Clicked Link</span>
                      <span className="font-medium">36.3%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '36.3%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Meeting Set</span>
                      <span className="font-medium">12.4%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '12.4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Category Insights */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-xl border border-indigo-800 shadow-sm text-white">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-400 mr-2" />
                  <h3 className="text-lg font-semibold">AI Insights</h3>
                </div>
                <p className="text-indigo-200 text-sm leading-relaxed mb-4">
                  Enterprise Sales is your top performing category this week. High priority leads are responding best to the "Automated Workflows" campaign template.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-sm">Enterprise Sales</span>
                    <span className="text-sm font-bold text-emerald-400">+24%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-lg">
                    <span className="text-sm">SaaS Startups</span>
                    <span className="text-sm font-bold text-emerald-400">+12%</span>
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
