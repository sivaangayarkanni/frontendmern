import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    position: '',
    tags: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact created:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <Input
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({...formData, company: e.target.value})}
      />
      <Input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
      />
      <Input
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({...formData, position: e.target.value})}
      />
      <Input
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={(e) => setFormData({...formData, tags: e.target.value})}
      />
      <div className="flex space-x-3">
        <Button type="submit">Create Contact</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  )
}