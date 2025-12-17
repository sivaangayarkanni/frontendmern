import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import Login from './modules/auth/Login'
import LeadList from './modules/leads/LeadList'
import LeadBoard from './modules/leads/LeadBoard'
import ContactList from './modules/contacts/ContactList'
import TaskList from './modules/tasks/TaskList'
import DealPipeline from './modules/deals/DealPipeline'
import TicketList from './modules/tickets/TicketList'
import Settings from './modules/settings/Settings'
import Analytics from './pages/Analytics'
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
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Landing />} />
            </>
          ) : (
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="leads" element={<LeadList />} />
              <Route path="leads/board" element={<LeadBoard />} />
              <Route path="contacts" element={<ContactList />} />
              <Route path="tasks" element={<TaskList />} />
              <Route path="deals" element={<DealPipeline />} />
              <Route path="tickets" element={<TicketList />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          )}
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
