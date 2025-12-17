import { useState } from 'react'
import { Plus, Filter, Search } from 'lucide-react'

const mockLeads = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Corp', status: 'New', value: '₹5,000' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Tech Inc', status: 'Qualified', value: '₹12,000' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', company: 'StartupXYZ', status: 'Proposal', value: '₹8,500' },
]

export default function LeadList() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #034C53, #007074, #F38C79, #FFC1B4)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-12 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-white/15 rounded-full animate-float"></div>
      </div>
      <div className="space-y-6 relative z-10 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <button className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Lead
          </button>
        </div>

        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors">
            <Filter className="w-4 h-4 mr-2 inline" />
            Filter
          </button>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100">
                  <td className="py-4 px-4 font-medium">{lead.name}</td>
                  <td className="py-4 px-4">{lead.email}</td>
                  <td className="py-4 px-4">{lead.company}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{lead.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}