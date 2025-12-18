import { useState } from 'react'
import { Ticket, Plus, Search, Clock, AlertTriangle, CheckCircle, User, Edit, Trash2, X, MessageSquare } from 'lucide-react'

export default function Tickets() {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Login Issue', description: 'User cannot access their account', customer: 'John Doe', priority: 'High', status: 'Open', assignee: 'Support Team', createdAt: '2024-01-10', category: 'Technical' },
    { id: 2, title: 'Feature Request', description: 'Request for new dashboard widget', customer: 'Jane Smith', priority: 'Low', status: 'In Progress', assignee: 'Dev Team', createdAt: '2024-01-12', category: 'Enhancement' }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ title: '', description: '', customer: '', priority: 'Medium', status: 'Open', assignee: 'Support Team', category: 'General' })

  const priorities = ['Low', 'Medium', 'High', 'Critical']
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed']
  const categories = ['General', 'Technical', 'Billing', 'Enhancement', 'Bug Report']
  
  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTicket) {
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...formData, id: editingTicket.id, createdAt: editingTicket.createdAt } : t))
    } else {
      setTickets([...tickets, { ...formData, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }])
    }
    setShowModal(false)
    setEditingTicket(null)
    setFormData({ title: '', description: '', customer: '', priority: 'Medium', status: 'Open', assignee: 'Support Team', category: 'General' })
  }

  const handleEdit = (ticket) => {
    setEditingTicket(ticket)
    setFormData(ticket)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setTickets(tickets.filter(t => t.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Open': return <AlertTriangle className="w-4 h-4" />
      case 'In Progress': return <Clock className="w-4 h-4" />
      case 'Resolved': return <CheckCircle className="w-4 h-4" />
      case 'Closed': return <CheckCircle className="w-4 h-4" />
      default: return <Ticket className="w-4 h-4" />
    }
  }

  const openTickets = tickets.filter(t => t.status === 'Open').length
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600">Manage customer support requests</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{openTickets}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressTickets}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{resolvedTickets}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Ticket className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {filteredTickets.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">#{ticket.id} - {ticket.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        Customer: {ticket.customer}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Assigned: {ticket.assignee}
                      </div>
                      <div>Category: {ticket.category}</div>
                      <div>Created: {ticket.createdAt}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleEdit(ticket)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(ticket.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <Ticket className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No tickets found.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{editingTicket ? 'Edit Ticket' : 'Add Ticket'}</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ticket title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg h-20"
                required
              />
              <input
                type="text"
                placeholder="Customer name"
                value={formData.customer}
                onChange={(e) => setFormData({...formData, customer: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority} Priority</option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Assignee"
                value={formData.assignee}
                onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  {editingTicket ? 'Update' : 'Add'} Ticket
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
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