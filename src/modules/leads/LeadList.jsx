import { useState } from 'react'
import { Plus, Search, UserCheck, Edit, Trash2, X } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

export default function LeadList() {
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Corp', status: 'New', value: 5000, phone: '+1 234 567 8900' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Tech Inc', status: 'Qualified', value: 12000, phone: '+1 234 567 8901' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', company: 'StartupXYZ', status: 'Proposal', value: 8500, phone: '+1 234 567 8902' },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingLead, setEditingLead] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', status: 'New', value: '' })
  const { addNotification } = useApp()

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingLead) {
      setLeads(leads.map(l => l.id === editingLead.id ? { ...formData, id: editingLead.id, value: Number(formData.value) } : l))
      addNotification({ type: 'success', title: 'Lead Updated', message: `${formData.name} has been updated successfully.` })
    } else {
      setLeads([...leads, { ...formData, id: Date.now(), value: Number(formData.value) }])
      addNotification({ type: 'success', title: 'Lead Added', message: `${formData.name} has been added to your leads.` })
    }
    setShowModal(false)
    setEditingLead(null)
    setFormData({ name: '', email: '', phone: '', company: '', status: 'New', value: '' })
  }

  const handleEdit = (lead) => {
    setEditingLead(lead)
    setFormData(lead)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    const lead = leads.find(l => l.id === id)
    setLeads(leads.filter(l => l.id !== id))
    addNotification({ type: 'success', title: 'Lead Deleted', message: `${lead.name} has been removed from your leads.` })
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'badge-info'
      case 'Qualified': return 'badge-success'
      case 'Proposal': return 'badge-warning'
      case 'Closed': return 'badge-neutral'
      default: return 'badge-neutral'
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 animate-slideIn">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leads</h1>
          <p className="text-gray-600 mt-1">Manage your sales leads and prospects</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 card-elevated animate-slideIn">
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-4">
            <div className="flex-1 relative group">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search leads by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 focus:bg-white transition-all duration-300 form-input"
              />
            </div>
          </div>
        </div>
        
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-professional">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="font-semibold text-gray-900">{lead.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{lead.company}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${lead.value.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(lead)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                          title="Edit Lead"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No leads found.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editingLead ? 'Edit Lead' : 'Add New Lead'}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md form-input"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md form-input"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md form-input"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md form-input"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md form-select"
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Closed">Closed</option>
              </select>
              <input
                type="number"
                placeholder="Lead Value"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md form-input"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 btn-primary">
                  {editingLead ? 'Update' : 'Add'} Lead
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}