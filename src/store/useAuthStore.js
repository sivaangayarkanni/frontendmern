import { create } from 'zustand'
import { verifyJWT, isTokenExpired, generateJWT, hashPassword } from '../utils/auth'
import { getToken, removeToken, saveToken, findUserByEmail, saveUser } from '../utils/storage'

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
      const user = findUserByEmail(email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      const hashedPassword = hashPassword(password);
      if (user.password !== hashedPassword) {
        throw new Error('Invalid password');
      }
      
      const tokenPayload = {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
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
  
  signup: async (userData) => {
    set({ isLoading: true, error: null });
    
    try {
      const { name, email, password, role } = userData;
      
      if (findUserByEmail(email)) {
        throw new Error('User already exists');
      }
      
      const hashedPassword = hashPassword(password);
      const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
        role,
        createdAt: new Date().toISOString()
      };
      
      saveUser(newUser);
      
      const tokenPayload = {
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
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
  }
}))

export { useAuthStore }