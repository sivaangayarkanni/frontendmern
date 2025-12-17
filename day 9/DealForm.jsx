import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function DealForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    value: '',
    probability: 20,
    stage: 'prospecting',
    closeDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Deal created:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Deal Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <Input
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({...formData, company: e.target.value})}
        required
      />
      <Input
        type="number"
        placeholder="Deal Value"
        value={formData.value}
        onChange={(e) => setFormData({...formData, value: e.target.value})}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Probability: {formData.probability}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={formData.probability}
          onChange={(e) => setFormData({...formData, probability: e.target.value})}
          className="w-full"
        />
      </div>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        value={formData.stage}
        onChange={(e) => setFormData({...formData, stage: e.target.value})}
      >
        <option value="prospecting">Prospecting</option>
        <option value="qualification">Qualification</option>
        <option value="proposal">Proposal</option>
        <option value="negotiation">Negotiation</option>
      </select>
      <Input
        type="date"
        placeholder="Expected Close Date"
        value={formData.closeDate}
        onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
      />
      <div className="flex space-x-3">
        <Button type="submit">Create Deal</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  )
}