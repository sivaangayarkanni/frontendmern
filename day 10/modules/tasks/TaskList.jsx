import { useState } from 'react'
import { Plus, Calendar, Clock } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card, { CardHeader, CardContent } from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import TaskForm from './TaskForm'

const mockTasks = [
  { id: 1, title: 'Follow up with John Doe', description: 'Send proposal and schedule demo', dueDate: '2024-01-15', priority: 'High', status: 'Pending' },
  { id: 2, title: 'Prepare quarterly report', description: 'Compile sales data for Q4', dueDate: '2024-01-20', priority: 'Medium', status: 'In Progress' },
  { id: 3, title: 'Team meeting', description: 'Weekly sync with sales team', dueDate: '2024-01-12', priority: 'Low', status: 'Completed' },
]

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
}

export default function TaskList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('All')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex space-x-4">
        {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {mockTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {task.dueDate}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <TaskForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}