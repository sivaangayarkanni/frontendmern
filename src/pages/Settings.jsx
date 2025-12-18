import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react'

export default function Settings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Settings Menu</h2>
            </div>
            <nav className="p-4 space-y-2">
              <a href="#" className="flex items-center p-2 text-blue-600 bg-blue-50 rounded-lg">
                <User className="w-4 h-4 mr-3" />
                Profile Settings
              </a>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </a>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Shield className="w-4 h-4 mr-3" />
                Security
              </a>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Database className="w-4 h-4 mr-3" />
                Data Management
              </a>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Profile Settings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your display name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>UTC</option>
                    <option>EST</option>
                    <option>PST</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}