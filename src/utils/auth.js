import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_JWT_SECRET || 'mini-crm-jwt-secret-2024-secure';
const SALT_ROUNDS = 12;

// Enhanced password hashing with salt
export const hashPassword = (password) => {
  const salt = CryptoJS.lib.WordArray.random(128/8).toString();
  const hash = CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 10000
  }).toString();
  return `${salt}:${hash}`;
};

export const verifyPassword = (password, hashedPassword) => {
  try {
    const [salt, hash] = hashedPassword.split(':');
    const testHash = CryptoJS.PBKDF2(password, salt, {
      keySize: 256/32,
      iterations: 10000
    }).toString();
    return testHash === hash;
  } catch (error) {
    return false;
  }
};

// Enhanced JWT with security features
export const generateJWT = (payload) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const now = Math.floor(Date.now() / 1000);
  const enhancedPayload = {
    ...payload,
    iat: now,
    exp: now + (2 * 60 * 60), // 2 hours
    jti: CryptoJS.lib.WordArray.random(128/8).toString(), // JWT ID for revocation
    aud: 'mini-crm-app',
    iss: 'mini-crm-auth'
  };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(enhancedPayload));
  
  const signature = CryptoJS.HmacSHA256(
    encodedHeader + '.' + encodedPayload,
    SECRET_KEY
  ).toString();
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const verifyJWT = (token) => {
  try {
    const [header, payload, signature] = token.split('.');
    
    const expectedSignature = CryptoJS.HmacSHA256(
      header + '.' + payload,
      SECRET_KEY
    ).toString();
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const decodedPayload = JSON.parse(atob(payload));
    
    // Verify audience and issuer
    if (decodedPayload.aud !== 'mini-crm-app' || decodedPayload.iss !== 'mini-crm-auth') {
      return null;
    }
    
    return decodedPayload;
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = verifyJWT(token);
  if (!payload) return true;
  
  const now = Math.floor(Date.now() / 1000);
  return now >= payload.exp;
};

// Security validation functions
export const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const errors = [];
  if (password.length < minLength) errors.push('At least 8 characters');
  if (!hasUpperCase) errors.push('One uppercase letter');
  if (!hasLowerCase) errors.push('One lowercase letter');
  if (!hasNumbers) errors.push('One number');
  if (!hasSpecialChar) errors.push('One special character');
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: errors.length === 0 ? 'Strong' : errors.length <= 2 ? 'Medium' : 'Weak'
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Rate limiting for login attempts
const loginAttempts = new Map();

export const checkRateLimit = (email) => {
  const now = Date.now();
  const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: now };
  
  // Reset if more than 15 minutes passed
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    attempts.count = 0;
  }
  
  if (attempts.count >= 5) {
    const timeLeft = Math.ceil((15 * 60 * 1000 - (now - attempts.lastAttempt)) / 1000 / 60);
    return { allowed: false, timeLeft };
  }
  
  return { allowed: true };
};

export const recordLoginAttempt = (email, success) => {
  const now = Date.now();
  const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: now };
  
  if (success) {
    loginAttempts.delete(email);
  } else {
    attempts.count += 1;
    attempts.lastAttempt = now;
    loginAttempts.set(email, attempts);
  }
};