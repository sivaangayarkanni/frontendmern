import { create } from 'zustand'
import { apiClient } from '../utils/api'

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Initialize auth state from localStorage
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        set({ user: parsedUser, isAuthenticated: true });
        // Optionally verify token with backend
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },

  // Login function
  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.post('/auth/login', credentials);

      const { token, user } = response;

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
      error: null
    });
  },

  // Clear error
  clearError: () => set({ error: null }),
}))

export { useAuthStore }