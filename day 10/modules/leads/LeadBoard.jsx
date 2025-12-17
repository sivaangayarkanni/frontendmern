import { useState } from 'react'
import Card, { CardHeader, CardContent } from '../../components/ui/Card'

const columns = [
  { id: 'new', title: 'New', leads: [
    { id: 1, name: 'John Doe', company: 'Acme Corp', value: '$5,000' },
    { id: 2, name: 'Alice Brown', company: 'Beta LLC', value: '$3,200' }
  ]},
  { id: 'contacted', title: 'Contacted', leads: [
    { id: 3, name: 'Charlie Wilson', company: 'Gamma Inc', value: '$7,800' }
  ]},
  { id: 'qualified', title: 'Qualified', leads: [
    { id: 4, name: 'Jane Smith', company: 'Tech Inc', value: '$12,000' }
  ]},
  { id: 'proposal', title: 'Proposal', leads: [
    { id: 5, name: 'Bob Johnson', company: 'StartupXYZ', value: '$8,500' }
  ]}
]

export default function LeadBoard() {
  const [boardData, setBoardData] = useState(columns)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {boardData.map((column) => (
          <div key={column.id} className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center justify-between">
              {column.title}
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {column.leads.length}
              </span>
            </h3>
            <div className="space-y-3">
              {column.leads.map((lead) => (
                <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-gray-900">{lead.name}</h4>
                    <p className="text-sm text-gray-600">{lead.company}</p>
                    <p className="text-sm font-semibold text-green-600 mt-2">{lead.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}