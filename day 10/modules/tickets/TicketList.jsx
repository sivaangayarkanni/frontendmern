import { useState } from 'react'
import { Plus, MessageCircle, Clock } from 'lucide-react'
import Button from '../../components/ui/Button'
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import TicketForm from './TicketForm'

const mockTickets = [
  { id: 1, title: 'Login Issues', customer: 'John Doe', status: 'Open', priority: 'High', created: '2024-01-10', updated: '2024-01-12' },
  { id: 2, title: 'Feature Request', customer: 'Jane Smith', status: 'In Progress', priority: 'Medium', created: '2024-01-08', updated: '2024-01-11' },
  { id: 3, title: 'Bug Report', customer: 'Bob Johnson', status: 'Resolved', priority: 'Low', created: '2024-01-05', updated: '2024-01-09' },
]

const statusColors = {
  Open: 'bg-red-100 text-red-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
  Closed: 'bg-gray-100 text-gray-800'
}

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
}

export default function TicketList() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">#{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.customer}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </TableCell>
                <TableCell>{ticket.created}</TableCell>
                <TableCell>{ticket.updated}</TableCell>
                <TableCell>
                  <Button variant="outline" className="text-xs px-2 py-1">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Ticket">
        <TicketForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}