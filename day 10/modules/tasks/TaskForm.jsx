import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function TaskForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    assignee: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Task created:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Task Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        rows="3"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <Input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
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
      <Input
        placeholder="Assignee"
        value={formData.assignee}
        onChange={(e) => setFormData({...formData, assignee: e.target.value})}
      />
      <div className="flex space-x-3">
        <Button type="submit">Create Task</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  )
}