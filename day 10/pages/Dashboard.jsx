import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import Card, { CardHeader, CardContent } from '../components/ui/Card'
import Carousel from '../components/ui/Carousel'
import { TrendingUp, Users, UserCheck, IndianRupee, Calendar, Bell, Target, Award, Briefcase, Phone } from 'lucide-react'

const stats = [
  { name: 'Total Leads', value: '2,651', change: '+4.75%', icon: UserCheck, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { name: 'Active Deals', value: '184', change: '+54.02%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
  { name: 'Total Contacts', value: '8,459', change: '-1.39%', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { name: 'Revenue', value: '₹40,50,910', change: '+10.18%', icon: IndianRupee, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
]

const carouselSlides = [
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    title: 'Lead Management Excellence',
    description: 'Transform prospects into loyal customers with intelligent lead tracking'
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    title: 'Sales Pipeline Mastery',
    description: 'Visualize opportunities and accelerate deal closure with precision'
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
    title: 'Analytics That Drive Results',
    description: 'Unlock actionable insights that propel your business forward'
  }
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

const pieData = [
  { name: 'New Leads', value: 35, color: '#3b82f6' },
  { name: 'Qualified', value: 25, color: '#10b981' },
  { name: 'Proposal', value: 20, color: '#f59e0b' },
  { name: 'Closed Won', value: 20, color: '#8b5cf6' },
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
    <div className="min-h-screen p-6 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #034C53, #007074, #F38C79, #FFC1B4)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/15 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/10 rounded-full animate-bounce-slow"></div>
      </div>
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/80 mt-1">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-white/70 hover:text-white">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="text-right">
              <p className="text-sm text-white/70">Today</p>
              <p className="font-semibold text-white">{new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <Carousel slides={carouselSlides} />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const cardClasses = ['card-primary animate-float', 'card-secondary animate-pulse-slow', 'card-accent animate-bounce-slow', 'bg-white rounded-2xl shadow-2xl border-4 p-8 transition-all duration-300 animate-float'];
            const textClasses = ['text-pattern-1', 'text-pattern-2', 'text-pattern-3', 'text-pattern-1'];
            cardClasses[3] += ' border-[#FFE1AF]';
            return (
              <div key={stat.name} className={cardClasses[index]} style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wider">{stat.name}</p>
                    <p className={`text-3xl font-black mb-3 ${textClasses[index]}`}>{stat.value}</p>
                    <p className={`text-sm font-bold`} style={{color: stat.change.startsWith('+') ? '#034C53' : '#007074'}}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl animate-pulse`} style={{backgroundColor: index === 0 ? '#FFC1B4' : index === 1 ? '#F38C79' : index === 2 ? '#007074' : '#034C53', opacity: 0.3}}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500" style={{border: '4px solid #F38C79'}}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-pattern-2">Revenue & Leads Performance</h3>
              <select className="btn-secondary text-sm px-4 py-2">
                <option>Last 7 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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

          {/* Pipeline Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-7 transition-all duration-300" style={{border: '2px solid #007074'}}>
            <h3 className="text-xl font-bold text-pattern-3 mb-8">Sales Pipeline Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300" style={{border: '4px solid #FFC1B4'}}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-pattern-1">Recent Team Activities</h3>
            <button className="btn-primary">View All Activities</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center space-x-6 p-4 rounded-2xl transition-all duration-300 border-2 border-transparent" style={{'&:hover': {background: 'linear-gradient(to right, #f8fafc, #FFE1AF)', borderColor: '#E2B59A'}}}>
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse`}>
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600 font-medium">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}