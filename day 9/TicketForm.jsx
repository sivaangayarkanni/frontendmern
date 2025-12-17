import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function TicketForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    description: '',
    priority: 'Medium',
    category: 'General'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Ticket created:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Ticket Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <Input
        placeholder="Customer Name"
        value={formData.customer}
        onChange={(e) => setFormData({...formData, customer: e.target.value})}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        rows="4"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        value={formData.priority}
        onChange={(e) => setFormData({...formData, priority: e.target.value})}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      >
        <option value="General">General</option>
        <option value="Technical">Technical</option>
        <option value="Billing">Billing</option>
        <option value="Feature Request">Feature Request</option>
      </select>
      <div className="flex space-x-3">
        <Button type="submit">Create Ticket</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  )
}