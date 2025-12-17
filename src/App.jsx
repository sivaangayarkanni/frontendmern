import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import LeadList from './modules/leads/LeadList'
import { useAuthStore } from './store/useAuthStore'

const queryClient = new QueryClient()

function App() {
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Auth />} />
            </>
          ) : (
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="leads" element={<LeadList />} />
            </Route>
          )}
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App