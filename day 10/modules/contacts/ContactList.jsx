import { useState } from 'react'
import { Plus, Search, Building } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import ContactForm from './ContactForm'

const mockContacts = [
  { id: 1, name: 'John Doe', email: 'john@acme.com', company: 'Acme Corp', phone: '+1-555-0123', tags: ['VIP', 'Enterprise'] },
  { id: 2, name: 'Jane Smith', email: 'jane@tech.com', company: 'Tech Inc', phone: '+1-555-0124', tags: ['Prospect'] },
  { id: 3, name: 'Bob Johnson', email: 'bob@startup.com', company: 'StartupXYZ', phone: '+1-555-0125', tags: ['SMB'] },
]

export default function ContactList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Building className="w-4 h-4 mr-2" />
            Companies
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search contacts..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {contact.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Contact">
        <ContactForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}