import { useState } from 'react';
import { User, Settings, Shield, Bell, CreditCard, LogOut, Camera, Edit3 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const userTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const adminTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'users', label: 'User Management', icon: User },
    { id: 'system', label: 'System Settings', icon: Settings },
  ];

  const currentTabs = user?.role === 'admin' ? adminTabs : userTabs;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #034C53, #007074, #F38C79, #FFC1B4)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-white/20 rounded-full animate-float"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src="/src/assets/images/profile-placeholder.svg"
                    alt="Profile"
                    className="w-28 h-28 rounded-full mx-auto border-4 border-teal-300 shadow-xl"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mt-4">{user?.name}</h3>
                <p className="text-slate-600">{user?.email}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mt-2">
                  {user?.role === 'admin' ? 'Administrator' : 'User'}
                </span>
              </div>
              
              <nav className="space-y-2">
                {currentTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-semibold ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 border-l-4 border-teal-500 shadow-lg transform scale-105'
                          : 'text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-teal-50 hover:text-teal-600 hover:scale-102'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-teal flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                    <input
                      type="text"
                      defaultValue="Sales"
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && user?.role === 'admin' && (
              <div className="card">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Billing & Subscription</h2>
                <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-600 text-white p-8 rounded-3xl mb-8 shadow-2xl border-4 border-violet-300 animate-float">
                  <h3 className="text-2xl font-bold mb-3">Enterprise Plan</h3>
                  <p className="text-violet-100 mb-6 text-lg">Complete CRM solution with advanced features</p>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black text-pattern-1">₹4,999/month</span>
                    <button className="btn-rose">
                      Current Plan
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="card-emerald animate-pulse-slow">
                    <h4 className="font-bold text-slate-900 text-lg">Active Contacts</h4>
                    <p className="text-3xl font-black text-pattern-1">1,247</p>
                    <p className="text-sm text-emerald-600 font-semibold">Growing Strong</p>
                  </div>
                  <div className="card-teal animate-bounce-slow">
                    <h4 className="font-bold text-slate-900 text-lg">Storage Usage</h4>
                    <p className="text-3xl font-black text-pattern-2">2.4 GB</p>
                    <p className="text-sm text-teal-600 font-semibold">of 50 GB</p>
                  </div>
                  <div className="card-violet animate-float">
                    <h4 className="font-bold text-slate-900 text-lg">Next Billing</h4>
                    <p className="text-3xl font-black text-pattern-3">15 Dec</p>
                    <p className="text-sm text-violet-600 font-semibold">2024</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card-primary">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-slate-900">Email Notifications</h4>
                      <p className="text-sm text-slate-600">Receive updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-slate-900">Task Reminders</h4>
                      <p className="text-sm text-slate-600">Get reminded about upcoming tasks</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && user?.role === 'admin' && (
              <div className="card">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Last Active</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Rajesh Kumar', email: 'rajesh@company.com', role: 'Sales Manager', status: 'Active', lastActive: '2 hours ago' },
                        { name: 'Priya Sharma', email: 'priya@company.com', role: 'Sales Rep', status: 'Active', lastActive: '1 day ago' },
                        { name: 'Amit Singh', email: 'amit@company.com', role: 'Support', status: 'Inactive', lastActive: '1 week ago' },
                      ].map((user, index) => (
                        <tr key={index} className="border-b border-slate-100">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img
                                src={`https://images.unsplash.com/photo-${index === 0 ? '1472099645785-5658abf4ff4e' : index === 1 ? '1494790108755-2616c9a8b8e3' : '1507003211169-0a1dd7228f2d'}?w=100&h=100&fit=crop&crop=face`}
                                alt={user.name}
                                className="w-12 h-12 rounded-full mr-4 border-2 border-teal-300 shadow-lg"
                              />
                              <div>
                                <p className="font-medium text-slate-900">{user.name}</p>
                                <p className="text-sm text-slate-600">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-700">{user.role}</td>
                          <td className="py-4 px-4">
                            <span className={`px-4 py-2 rounded-2xl text-sm font-bold border-2 ${
                              user.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-600">{user.lastActive}</td>
                          <td className="py-4 px-4">
                            <button className="btn-violet mr-4">Edit User</button>
                            <button className="btn-rose">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;