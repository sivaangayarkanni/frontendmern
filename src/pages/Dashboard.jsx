import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, UserCheck, IndianRupee, Calendar, Bell, Target, Award, Briefcase, Phone } from 'lucide-react'

const stats = [
  { name: 'Total Leads', value: '2,651', change: '+4.75%', icon: UserCheck, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { name: 'Active Deals', value: '184', change: '+54.02%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
  { name: 'Total Contacts', value: '8,459', change: '-1.39%', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { name: 'Revenue', value: '₹40,50,910', change: '+10.18%', icon: IndianRupee, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
]

const chartData = [
  { name: 'Jan', revenue: 400000, leads: 120 },
  { name: 'Feb', revenue: 300000, leads: 98 },
  { name: 'Mar', revenue: 200000, leads: 86 },
  { name: 'Apr', revenue: 278000, leads: 108 },
  { name: 'May', revenue: 189000, leads: 76 },
  { name: 'Jun', revenue: 239000, leads: 95 },
  { name: 'Jul', revenue: 349000, leads: 134 },
]

const recentActivities = [
  { id: 1, action: 'New lead created', user: 'Rajesh Kumar', time: '2 hours ago', icon: UserCheck, color: 'text-blue-600' },
  { id: 2, action: 'Deal closed - ₹2,50,000', user: 'Priya Sharma', time: '4 hours ago', icon: Award, color: 'text-green-600' },
  { id: 3, action: 'Task completed', user: 'Amit Singh', time: '6 hours ago', icon: Target, color: 'text-purple-600' },
  { id: 4, action: 'Client meeting scheduled', user: 'Neha Gupta', time: '8 hours ago', icon: Calendar, color: 'text-orange-600' },
  { id: 5, action: 'Follow-up call made', user: 'Vikram Patel', time: '1 day ago', icon: Phone, color: 'text-indigo-600' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce-slow blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-slideIn">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-2 text-lg">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group">
              <Bell className="w-6 h-6 group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </span>
            </button>
            <div className="text-right bg-white/60 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <p className="text-sm text-gray-500 font-medium">Today</p>
              <p className="font-bold text-gray-900">{new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const gradients = [
              'from-blue-500 to-blue-600',
              'from-green-500 to-green-600', 
              'from-purple-500 to-purple-600',
              'from-emerald-500 to-emerald-600'
            ];
            return (
              <div key={stat.name} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 card-elevated animate-slideIn hover:scale-105 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${gradients[index]} mr-3`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{stat.name}</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className={`text-sm font-semibold flex items-center ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500 rotate-180'
                      }`} />
                      {stat.change} from last month
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 card-elevated animate-slideIn border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Revenue & Leads Performance</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Revenue</span>
                <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600">Leads</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #10b981', 
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontWeight: 'bold'
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString('en-IN')}` : value,
                    name === 'revenue' ? 'Revenue' : 'Leads'
                  ]}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 card-elevated animate-slideIn border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Team Activities</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="p-3 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}