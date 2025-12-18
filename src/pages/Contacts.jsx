import { useState } from 'react'
import { Users, Plus, Search, Filter, Mail, Phone, MapPin, Edit, Trash2, X } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

export default function Contacts() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', company: 'Tech Corp', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', company: 'Design Studio', status: 'Active' }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', status: 'Active' })

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const { addNotification } = useApp()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id ? { ...formData, id: editingContact.id } : c))
      addNotification({
        type: 'success',
        title: 'Contact Updated',
        message: `${formData.name} has been updated successfully.`
      })
    } else {
      setContacts([...contacts, { ...formData, id: Date.now() }])
      addNotification({
        type: 'success',
        title: 'Contact Added',
        message: `${formData.name} has been added to your contacts.`
      })
    }
    setShowModal(false)
    setEditingContact(null)
    setFormData({ name: '', email: '', phone: '', company: '', status: 'Active' })
  }

  const handleEdit = (contact) => {
    setEditingContact(contact)
    setFormData(contact)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    const contact = contacts.find(c => c.id === id)
    setContacts(contacts.filter(c => c.id !== id))
    addNotification({
      type: 'success',
      title: 'Contact Deleted',
      message: `${contact.name} has been removed from your contacts.`
    })
  }

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 animate-slideIn">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contacts</h1>
          <p className="text-gray-600 mt-1">Manage your customer contacts and relationships</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2 hover:scale-105 transform transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 card-elevated animate-slideIn">
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-4">
            <div className="flex-1 relative group">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search contacts by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 focus:bg-white transition-all duration-300 form-input"
              />
            </div>
          </div>
        </div>
        
        {filteredContacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-professional">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                          {contact.name.charAt(0)}
                        </div>
                        <div className="font-semibold text-gray-900">{contact.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {contact.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {contact.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{contact.company}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full border border-green-200">
                        <span className="status-dot status-active"></span>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(contact)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
                          title="Edit Contact"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200"
                          title="Delete Contact"
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
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No contacts found.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 form-input"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 btn-primary">
                  {editingContact ? 'Update' : 'Add'} Contact
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
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