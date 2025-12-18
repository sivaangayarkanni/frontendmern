import CryptoJS from 'crypto-js';
import { hashPassword } from './auth';

// Secure user database using localStorage with encryption
const STORAGE_KEY = 'crm_users_encrypted';
const ENCRYPTION_KEY = 'crm-storage-key-2024';

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return [];
  }
};

export const getUsers = () => {
  const encryptedUsers = localStorage.getItem(STORAGE_KEY);
  return encryptedUsers ? decryptData(encryptedUsers) : [];
};

const saveUsers = (users) => {
  const encryptedUsers = encryptData(users);
  localStorage.setItem(STORAGE_KEY, encryptedUsers);
};

export const saveUser = (user) => {
  const users = getUsers();
  const newUser = {
    ...user,
    id: Date.now() + Math.random(),
    createdAt: new Date().toISOString(),
    lastLogin: null,
    loginAttempts: 0,
    isActive: true,
    permissions: user.role === 'admin' ? [
      'users.read', 'users.write', 'users.delete',
      'leads.read', 'leads.write', 'leads.delete',
      'contacts.read', 'contacts.write', 'contacts.delete',
      'deals.read', 'deals.write', 'deals.delete',
      'tasks.read', 'tasks.write', 'tasks.delete',
      'tickets.read', 'tickets.write', 'tickets.delete',
      'analytics.read', 'settings.write'
    ] : [
      'leads.read', 'leads.write',
      'contacts.read', 'contacts.write',
      'deals.read', 'deals.write',
      'tasks.read', 'tasks.write',
      'tickets.read', 'tickets.write'
    ]
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.isActive);
};

export const getUserById = (id) => {
  const users = getUsers();
  return users.find(user => user.id === id && user.isActive);
};

// Secure token management
const TOKEN_KEY = 'crm_token_secure';
const REFRESH_TOKEN_KEY = 'crm_refresh_token';

export const saveToken = (token, refreshToken = null) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
  localStorage.setItem(TOKEN_KEY, encryptedToken);
  
  if (refreshToken) {
    const encryptedRefreshToken = CryptoJS.AES.encrypt(refreshToken, ENCRYPTION_KEY).toString();
    localStorage.setItem(REFRESH_TOKEN_KEY, encryptedRefreshToken);
  }
};

export const getToken = () => {
  try {
    const encryptedToken = localStorage.getItem(TOKEN_KEY);
    if (!encryptedToken) return null;
    
    const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const updateUserLastLogin = (userId) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    users[userIndex].loginAttempts = 0;
    saveUsers(users);
  }
};

export const hasPermission = (user, permission) => {
  return user && user.permissions && user.permissions.includes(permission);
};