import { useState } from 'react'
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Target, Award, Activity } from 'lucide-react'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  
  // Mock data - in real app this would come from API
  const analytics = {
    totalLeads: 156,
    activeDeals: 23,
    revenue: 125000,
    conversionRate: 18.5,
    newContacts: 45,
    closedDeals: 8,
    avgDealSize: 15625,
    responseTime: 2.3
  }

  const monthlyData = [
    { month: 'Jan', leads: 45, deals: 12, revenue: 35000 },
    { month: 'Feb', leads: 52, deals: 15, revenue: 42000 },
    { month: 'Mar', leads: 38, deals: 9, revenue: 28000 },
    { month: 'Apr', leads: 61, deals: 18, revenue: 55000 },
    { month: 'May', leads: 49, deals: 14, revenue: 38000 },
    { month: 'Jun', leads: 67, deals: 21, revenue: 68000 }
  ]

  const leadSources = [
    { source: 'Website', count: 45, percentage: 35 },
    { source: 'Social Media', count: 32, percentage: 25 },
    { source: 'Email Campaign', count: 28, percentage: 22 },
    { source: 'Referrals', count: 23, percentage: 18 }
  ]

  const dealStages = [
    { stage: 'Lead', count: 45, color: 'bg-gray-400' },
    { stage: 'Qualified', count: 32, color: 'bg-blue-400' },
    { stage: 'Proposal', count: 18, color: 'bg-yellow-400' },
    { stage: 'Negotiation', count: 12, color: 'bg-orange-400' },
    { stage: 'Closed Won', count: 8, color: 'bg-green-400' }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalLeads}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeDeals}</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.revenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
              <p className="text-sm text-green-600">+2.3% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <Activity className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">New Contacts</p>
          <p className="text-xl font-bold text-gray-900">{analytics.newContacts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Closed Deals</p>
          <p className="text-xl font-bold text-gray-900">{analytics.closedDeals}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Avg Deal Size</p>
          <p className="text-xl font-bold text-gray-900">${analytics.avgDealSize.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Avg Response Time</p>
          <p className="text-xl font-bold text-gray-900">{analytics.responseTime}h</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
          <div className="space-y-4">
            {monthlyData.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 w-8">{month.month}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${(month.leads / 70) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{month.leads} leads</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${month.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{month.deals} deals</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
          <div className="space-y-4">
            {leadSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' : 
                    index === 1 ? 'bg-green-500' : 
                    index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 
                        index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                      }`}
                      style={{width: `${source.percentage}%`}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{source.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deal Pipeline */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Pipeline</h3>
        <div className="flex items-center space-x-2 mb-4">
          {dealStages.map((stage, index) => (
            <div key={stage.stage} className="flex-1">
              <div className="text-center mb-2">
                <p className="text-sm font-medium text-gray-700">{stage.stage}</p>
                <p className="text-lg font-bold text-gray-900">{stage.count}</p>
              </div>
              <div className={`h-8 ${stage.color} rounded flex items-center justify-center text-white text-sm font-medium`}>
                {stage.count} deals
              </div>
              {index < dealStages.length - 1 && (
                <div className="flex justify-center mt-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}