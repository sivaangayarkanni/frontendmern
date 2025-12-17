import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, UserCheck, Calendar, Ticket, TrendingUp, Settings, BarChart3, User } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

const adminNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: UserCheck },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Tasks', href: '/tasks', icon: Calendar },
  { name: 'Deals', href: '/deals', icon: TrendingUp },
  { name: 'Tickets', href: '/tickets', icon: Ticket },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const userNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: UserCheck },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Tasks', href: '/tasks', icon: Calendar },
  { name: 'Deals', href: '/deals', icon: TrendingUp },
  { name: 'Profile', href: '/profile', icon: User },
]

export default function Sidebar() {
  const { user } = useAuthStore();
  const navigation = user?.role === 'admin' ? adminNavigation : userNavigation;

  return (
    <div className="w-64 bg-white shadow-lg border-r border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg animate-pulse" style={{background: 'linear-gradient(135deg, #034C53, #007074)'}}>
            <span className="text-white font-black text-lg">M</span>
          </div>
          <h1 className="text-2xl font-black text-pattern-1 ml-4">Mini CRM</h1>
        </div>
      </div>
      <nav className="p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive 
                    ? 'shadow-lg transform scale-105 border-l-4' 
                    : 'text-slate-600 hover:scale-102'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'linear-gradient(to right, rgba(3, 76, 83, 0.1), rgba(0, 112, 116, 0.1))',
                color: '#034C53',
                borderLeftColor: '#034C53'
              } : {}}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}