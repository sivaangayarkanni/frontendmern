import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card, { CardHeader, CardContent } from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import DealForm from './DealForm'

const pipelineStages = [
  { id: 'prospecting', title: 'Prospecting', deals: [
    { id: 1, title: 'Acme Corp Deal', company: 'Acme Corp', value: 25000, probability: 20 }
  ]},
  { id: 'qualification', title: 'Qualification', deals: [
    { id: 2, title: 'Tech Inc Partnership', company: 'Tech Inc', value: 45000, probability: 40 }
  ]},
  { id: 'proposal', title: 'Proposal', deals: [
    { id: 3, title: 'StartupXYZ Contract', company: 'StartupXYZ', value: 15000, probability: 70 }
  ]},
  { id: 'negotiation', title: 'Negotiation', deals: [
    { id: 4, title: 'Enterprise Solution', company: 'BigCorp', value: 85000, probability: 85 }
  ]},
  { id: 'closed', title: 'Closed Won', deals: [
    { id: 5, title: 'SMB Package', company: 'LocalBiz', value: 12000, probability: 100 }
  ]}
]

export default function DealPipeline() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{stage.title}</h3>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {stage.deals.length}
              </span>
            </div>
            <div className="space-y-3">
              {stage.deals.map((deal) => (
                <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-gray-900 text-sm">{deal.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{deal.company}</p>
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-semibold text-green-600">
                        ${deal.value.toLocaleString()}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">{deal.probability}% probability</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Deal">
        <DealForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}