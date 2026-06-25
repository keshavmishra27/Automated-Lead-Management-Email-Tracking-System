import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Users, Search, Filter, Download, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

const mockLeads = [
  { id: 1, name: "Sarah Connor", email: "sarah@skynet.com", company: "Cyberdyne Systems", status: "New", priority: "High", date: "2023-10-27" },
  { id: 2, name: "Bruce Wayne", email: "bruce@wayneent.com", company: "Wayne Enterprises", status: "Contacted", priority: "Medium", date: "2023-10-26" },
  { id: 3, name: "Tony Stark", email: "tony@stark.com", company: "Stark Industries", status: "Meeting Set", priority: "High", date: "2023-10-25" },
  { id: 4, name: "Diana Prince", email: "diana@themyscira.gov", company: "Antiquities Dept", status: "New", priority: "Low", date: "2023-10-24" },
  { id: 5, name: "Clark Kent", email: "clark@dailyplanet.com", company: "Daily Planet", status: "Lost", priority: "Medium", date: "2023-10-23" },
  { id: 6, name: "Peter Parker", email: "peter@dailybugle.com", company: "Daily Bugle", status: "Contacted", priority: "Low", date: "2023-10-22" },
  { id: 7, name: "Natasha Romanoff", email: "nat@shield.gov", company: "S.H.I.E.L.D.", status: "Meeting Set", priority: "High", date: "2023-10-21" },
];

interface LeadsPageProps {
  onNavigate?: (view: string) => void;
}

export function LeadsPage({ onNavigate }: LeadsPageProps = {}) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = mockLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                All Leads
              </h1>
              <p className="text-slate-500 mt-1">Manage and track your prospects.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                <Filter className="w-4 h-4 mr-2 text-slate-500" />
                Filter Options
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Export Leads
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4 items-center">
             <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 transition-colors"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 text-slate-500 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Name / Email</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">AI Priority</th>
                    <th className="px-6 py-4">Added Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-slate-50/50 transition-colors"
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
                      <td className="px-6 py-4 text-slate-500">
                        {lead.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => onNavigate?.('lead-details')}
                          className="text-sm text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
                        >
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No leads found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Mock */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="text-sm text-slate-500">Showing 1-{filteredLeads.length} of 124 leads</div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm rounded border border-slate-200 text-slate-400 bg-white disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1.5 text-sm rounded border border-slate-200 hover:bg-slate-100 text-slate-700 bg-white transition-colors">Next</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
