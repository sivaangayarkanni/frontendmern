import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { TrendingUp, Users, IndianRupee, Target, Award, Calendar, ArrowUp, ArrowDown } from 'lucide-react'

const salesData = [
  { month: 'Jan', revenue: 450000, leads: 120, deals: 45 },
  { month: 'Feb', revenue: 380000, leads: 98, deals: 38 },
  { month: 'Mar', revenue: 520000, leads: 145, deals: 52 },
  { month: 'Apr', revenue: 680000, leads: 178, deals: 68 },
  { month: 'May', revenue: 590000, leads: 156, deals: 59 },
  { month: 'Jun', revenue: 720000, leads: 189, deals: 72 },
]

const regionData = [
  { name: 'North India', value: 35, color: '#10b981' },
  { name: 'South India', value: 28, color: '#3b82f6' },
  { name: 'West India', value: 22, color: '#8b5cf6' },
  { name: 'East India', value: 15, color: '#f59e0b' },
]

const performanceData = [
  { name: 'Rajesh Kumar', deals: 24, revenue: 1200000, conversion: 85 },
  { name: 'Priya Sharma', deals: 19, revenue: 950000, conversion: 78 },
  { name: 'Amit Singh', deals: 16, revenue: 800000, conversion: 72 },
  { name: 'Neha Gupta', deals: 21, revenue: 1050000, conversion: 81 },
]

export default function Analytics() {
  return (
    <div className="min-h-screen p-8 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #034C53, #007074, #F38C79, #FFC1B4)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-16 w-28 h-28 bg-white/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-20 right-20 w-36 h-36 bg-white/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-16 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
      </div>
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-black text-pattern-2 mb-4 animate-float">Analytics Dashboard</h1>
          <p className="text-xl text-white/80 font-medium">Deep insights into your business performance and growth metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card-emerald animate-pulse-slow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">Total Revenue</p>
                <p className="text-4xl font-black text-pattern-1">₹34.2L</p>
                <div className="flex items-center mt-3">
                  <ArrowUp className="w-4 h-4 text-emerald-600 mr-1" />
                  <span className="text-sm font-bold text-emerald-600">+12.5%</span>
                </div>
              </div>
              <div className="p-4 bg-emerald-100 rounded-2xl animate-bounce-slow">
                <IndianRupee className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="card-teal animate-float" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Active Deals</p>
                <p className="text-4xl font-black text-pattern-2">334</p>
                <div className="flex items-center mt-3">
                  <ArrowUp className="w-4 h-4 text-teal-600 mr-1" />
                  <span className="text-sm font-bold text-teal-600">+8.3%</span>
                </div>
              </div>
              <div className="p-4 bg-teal-100 rounded-2xl animate-pulse">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="card-violet animate-bounce-slow" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-2">Conversion Rate</p>
                <p className="text-4xl font-black text-pattern-3">78.9%</p>
                <div className="flex items-center mt-3">
                  <ArrowUp className="w-4 h-4 text-violet-600 mr-1" />
                  <span className="text-sm font-bold text-violet-600">+5.2%</span>
                </div>
              </div>
              <div className="p-4 bg-violet-100 rounded-2xl animate-float">
                <Award className="w-8 h-8 text-violet-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border-4 border-rose-200 p-8 hover:border-rose-400 transition-all duration-300 animate-pulse-slow" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-2">Team Members</p>
                <p className="text-4xl font-black text-pattern-1">24</p>
                <div className="flex items-center mt-3">
                  <ArrowUp className="w-4 h-4 text-rose-600 mr-1" />
                  <span className="text-sm font-bold text-rose-600">+2 new</span>
                </div>
              </div>
              <div className="p-4 bg-rose-100 rounded-2xl animate-bounce-slow">
                <Users className="w-8 h-8 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border-4 border-emerald-200 p-8 hover:border-emerald-400 transition-all duration-500">
            <h3 className="text-2xl font-black text-pattern-1 mb-8">Revenue Growth Trajectory</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} fontWeight="bold" />
                <YAxis stroke="#64748b" fontSize={12} fontWeight="bold" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #10b981', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)',
                    fontWeight: 'bold'
                  }}
                  formatter={(value) => [`₹${(value/1000).toFixed(0)}K`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fill="url(#colorRevenue)"
                  dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Distribution */}
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-teal-200 p-8 hover:border-teal-400 transition-all duration-500">
            <h3 className="text-2xl font-black text-pattern-2 mb-8">Regional Performance</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Market Share']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #14b8a6', 
                    borderRadius: '16px',
                    fontWeight: 'bold'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {regionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-3 border-2 border-white shadow-lg" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-violet-200 p-8 hover:border-violet-400 transition-all duration-500">
          <h3 className="text-2xl font-black text-pattern-3 mb-8">Top Performers This Quarter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceData.map((member, index) => (
              <div key={index} className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                index === 0 ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300' :
                index === 1 ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300' :
                index === 2 ? 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-300' :
                'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-300'
              }`}>
                <div className="text-center">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      index === 0 ? '1472099645785-5658abf4ff4e' :
                      index === 1 ? '1494790108755-2616c9a8b8e3' :
                      index === 2 ? '1507003211169-0a1dd7228f2d' :
                      '1560250097-0b93528c311a'
                    }?w=150&h=150&fit=crop&crop=face`}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white shadow-xl"
                  />
                  <h4 className="font-black text-slate-900 text-lg mb-2">{member.name}</h4>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-600">{member.deals} Deals Closed</p>
                    <p className="text-lg font-black text-pattern-1">₹{(member.revenue/100000).toFixed(1)}L</p>
                    <p className="text-sm font-bold text-emerald-600">{member.conversion}% Conversion</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}