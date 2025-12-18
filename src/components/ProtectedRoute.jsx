import { useAuthStore } from '../store/useAuthStore'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, permission, adminOnly = false }) {
  const { user, hasPermission } = useAuthStore()

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  if (adminOnly && user.role !== 'admin') {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">You don't have permission to access this page. Admin privileges required.</p>
        </div>
      </div>
    )
  }

  if (permission && !hasPermission(permission)) {
    return (
      <div className="p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Insufficient Permissions</h2>
          <p className="text-yellow-600">You don't have the required permissions to access this feature.</p>
        </div>
      </div>
    )
  }

  return children
}