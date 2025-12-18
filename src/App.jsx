import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import { AppProvider } from './contexts/AppContext'

const queryClient = new QueryClient()

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AppProvider>
  )
}

export default App