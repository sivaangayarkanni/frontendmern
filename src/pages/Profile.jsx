import { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit3, Save, X, Camera, Shield, Award, Activity } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

export default function Profile() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    department: 'Sales',
    position: 'Senior Sales Manager',
    joinDate: '2023-01-15',
    bio: 'Experienced sales professional with 8+ years in B2B sales and customer relationship management.',
    skills: ['Sales Strategy', 'CRM Management', 'Lead Generation', 'Customer Relations'],
    achievements: [
      { title: 'Top Performer Q4 2023', date: '2023-12-31', icon: Award },
      { title: '100+ Deals Closed', date: '2023-11-15', icon: Activity },
      { title: 'Customer Excellence Award', date: '2023-09-20', icon: Shield }
    ]
  })

  const [formData, setFormData] = useState(profileData)

  const handleSave = () => {
    setProfileData(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profileData)
    setIsEditing(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ]

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 card-elevated animate-slideIn">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {profileData.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
              <p className="text-gray-600 mb-2">{profileData.position}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user?.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <Shield className="w-4 h-4 mr-1" />
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <span className="text-sm">{profileData.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3 text-green-500" />
                <span className="text-sm">{profileData.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-red-500" />
                <span className="text-sm">{profileData.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-5 h-5 mr-3 text-purple-500" />
                <span className="text-sm">{profileData.department}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-orange-500" />
                <span className="text-sm">Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl card-elevated animate-slideIn">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{profileData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{profileData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{profileData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{profileData.location}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({...formData, department: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{profileData.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => setFormData({...formData, position: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{profileData.position}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Created new deal', target: 'Website Redesign Project', time: '2 hours ago', type: 'deal' },
                      { action: 'Updated contact', target: 'John Smith', time: '4 hours ago', type: 'contact' },
                      { action: 'Completed task', target: 'Follow up with lead', time: '1 day ago', type: 'task' },
                      { action: 'Added new lead', target: 'Tech Startup Inc.', time: '2 days ago', type: 'lead' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          activity.type === 'deal' ? 'bg-green-100 text-green-600' :
                          activity.type === 'contact' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'task' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          <Activity className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action} <span className="font-semibold">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements & Awards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData.achievements.map((achievement, index) => {
                      const Icon = achievement.icon
                      return (
                        <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                              <p className="text-sm text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}