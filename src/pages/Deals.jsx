import { useState } from 'react'
import { TrendingUp, Plus, Search, DollarSign, Calendar, User, Edit, Trash2, X } from 'lucide-react'

export default function Deals() {
  const [deals, setDeals] = useState([
    { id: 1, title: 'Website Redesign', client: 'Tech Corp', value: 15000, stage: 'Proposal', probability: 75, closeDate: '2024-02-15', owner: 'John Doe' },
    { id: 2, title: 'Mobile App Development', client: 'StartupXYZ', value: 25000, stage: 'Negotiation', probability: 60, closeDate: '2024-03-01', owner: 'Jane Smith' }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingDeal, setEditingDeal] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ title: '', client: '', value: '', stage: 'Lead', probability: 25, closeDate: '', owner: 'You' })

  const stages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']
  
  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingDeal) {
      setDeals(deals.map(d => d.id === editingDeal.id ? { ...formData, id: editingDeal.id, value: Number(formData.value) } : d))
    } else {
      setDeals([...deals, { ...formData, id: Date.now(), value: Number(formData.value) }])
    }
    setShowModal(false)
    setEditingDeal(null)
    setFormData({ title: '', client: '', value: '', stage: 'Lead', probability: 25, closeDate: '', owner: 'You' })
  }

  const handleEdit = (deal) => {
    setEditingDeal(deal)
    setFormData(deal)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setDeals(deals.filter(d => d.id !== id))
  }

  const getStageColor = (stage) => {
    switch(stage) {
      case 'Lead': return 'bg-gray-100 text-gray-800'
      case 'Qualified': return 'bg-blue-100 text-blue-800'
      case 'Proposal': return 'bg-yellow-100 text-yellow-800'
      case 'Negotiation': return 'bg-orange-100 text-orange-800'
      case 'Closed Won': return 'bg-green-100 text-green-800'
      case 'Closed Lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const wonDeals = deals.filter(deal => deal.stage === 'Closed Won')
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600">Track your sales opportunities</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Won Deals</p>
              <p className="text-2xl font-bold text-gray-900">${wonValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900">{deals.filter(d => !d.stage.includes('Closed')).length}</p>
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
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {filteredDeals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Close Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{deal.title}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {deal.owner}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{deal.client}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${deal.value.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${deal.probability}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{deal.closeDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(deal)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(deal.id)}
                          className="text-red-600 hover:text-red-800"
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
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No deals found.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{editingDeal ? 'Edit Deal' : 'Add Deal'}</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Deal title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Client name"
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Deal value"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <select
                value={formData.stage}
                onChange={(e) => setFormData({...formData, stage: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({...formData, probability: Number(e.target.value)})}
                className="w-full"
              />
              <div className="text-sm text-gray-600">Probability: {formData.probability}%</div>
              <input
                type="date"
                value={formData.closeDate}
                onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  {editingDeal ? 'Update' : 'Add'} Deal
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