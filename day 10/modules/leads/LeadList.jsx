import { useState } from 'react'
import { Plus, Filter, Search } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import LeadForm from './LeadForm'

const mockLeads = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Corp', status: 'New', value: '$5,000' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Tech Inc', status: 'Qualified', value: '$12,000' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', company: 'StartupXYZ', status: 'Proposal', value: '$8,500' },
]

export default function LeadList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #034C53, #007074, #F38C79, #FFC1B4)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-12 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-white/15 rounded-full animate-float"></div>
      </div>
      <div className="space-y-6 relative z-10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search leads..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {lead.status}
                  </span>
                </TableCell>
                <TableCell>{lead.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lead">
        <LeadForm onClose={() => setIsModalOpen(false)} />
      </Modal>
      </div>
    </div>
  )
}