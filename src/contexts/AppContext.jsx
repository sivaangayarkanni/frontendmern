import { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  theme: 'light',
  notifications: [],
  loading: false,
  error: null,
  settings: {
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  },
  stats: {
    totalLeads: 0,
    totalContacts: 0,
    totalDeals: 0,
    totalTasks: 0
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, { 
          id: Date.now(), 
          ...action.payload 
        }] 
      }
    case 'REMOVE_NOTIFICATION':
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload) 
      }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } }
    case 'UPDATE_STATS':
      return { ...state, stats: { ...state.stats, ...action.payload } }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const savedTheme = localStorage.getItem('crm_theme')
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    }
  }, [])

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme })
    localStorage.setItem('crm_theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id || Date.now() })
    }, 5000)
  }

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }

  const updateSettings = (settings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings })
  }

  const updateStats = (stats) => {
    dispatch({ type: 'UPDATE_STATS', payload: stats })
  }

  const value = {
    ...state,
    setTheme,
    addNotification,
    removeNotification,
    setLoading,
    setError,
    updateSettings,
    updateStats
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}