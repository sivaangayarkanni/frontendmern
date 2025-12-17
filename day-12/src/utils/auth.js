import CryptoJS from 'crypto-js';

const SECRET_KEY = 'mini-crm-secret-key-2024';

export const hashPassword = (password) => {
  return CryptoJS.SHA256(password + SECRET_KEY).toString();
};

export const generateJWT = (payload) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  
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
    
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = verifyJWT(token);
  if (!payload) return true;
  
  return Date.now() >= payload.exp * 1000;
};