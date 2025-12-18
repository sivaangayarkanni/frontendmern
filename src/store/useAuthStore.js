import { create } from 'zustand'
import { apiClient } from '../utils/api'
import { verifyJWT, isTokenExpired, validatePasswordStrength, validateEmail } from '../utils/auth'
import { getToken, removeToken, saveToken, hasPermission } from '../utils/storage'

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  
  initializeAuth: () => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const payload = verifyJWT(token);
      if (payload) {
        set({ 
          user: payload.user, 
          isAuthenticated: true, 
          token 
        });
      }
    }
  },
  
  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const { email, password } = credentials;

      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        token
      });

      saveToken(token);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      set({
        isLoading: false,
        error: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  },
  
  signup: async (userData) => {
    set({ isLoading: true, error: null });
    
    try {
      const { name, email, password, role } = userData;
      
      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      
      // Validate password strength
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        throw new Error(`Password must have: ${passwordValidation.errors.join(', ')}`);
      }
      
      // Check if user already exists
      if (findUserByEmail(email)) {
        throw new Error('User with this email already exists');
      }
      
      // Validate name
      if (!name || name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }
      
      const hashedPassword = hashPassword(password);
      const newUser = saveUser({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || 'user'
      });
      
      const tokenPayload = {
        user: { 
          id: newUser.id, 
          name: newUser.name, 
          email: newUser.email, 
          role: newUser.role,
          permissions: newUser.permissions
        }
      };
      
      const token = generateJWT(tokenPayload);
      
      set({
        user: tokenPayload.user,
        isAuthenticated: true,
        isLoading: false,
        token
      });
      
      saveToken(token);
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },
  
  logout: () => {
    removeToken();
    set({
      user: null,
      isAuthenticated: false,
      token: null,
      error: null
    });
  },
  
  clearError: () => set({ error: null }),
  
  checkAuth: () => {
    const { token } = get();
    if (!token || isTokenExpired(token)) {
      get().logout();
      return false;
    }
    return true;
  },
  
  hasPermission: (permission) => {
    const { user } = get();
    return hasPermission(user, permission);
  },
  
  refreshToken: async () => {
    const { token, user } = get();
    if (!token || !user) return false;
    
    try {
      const newToken = generateJWT({ user });
      set({ token: newToken });
      saveToken(newToken);
      return true;
    } catch (error) {
      get().logout();
      return false;
    }
  }
}))

export { useAuthStore }