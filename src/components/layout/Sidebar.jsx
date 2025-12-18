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
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const userNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: UserCheck },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Tasks', href: '/tasks', icon: Calendar },
  { name: 'Deals', href: '/deals', icon: TrendingUp },
  { name: 'Tickets', href: '/tickets', icon: Ticket },
  { name: 'Profile', href: '/profile', icon: User },
]

export default function Sidebar() {
  const { user } = useAuthStore();
  const navigation = user?.role === 'admin' ? adminNavigation : userNavigation;

  return (
    <div className="w-64 bg-white shadow-lg border-r border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 ml-4">Mini CRM</h1>
        </div>
      </div>
      <nav className="p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
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