import { hashPassword } from './auth';
import { saveUser, getUsers } from './storage';

export const seedDemoUsers = () => {
  const existingUsers = getUsers();
  
  if (existingUsers.length === 0) {
    const demoUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@demo.com',
        password: hashPassword('admin123'),
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Demo User',
        email: 'user@demo.com',
        password: hashPassword('user123'),
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ];
    
    demoUsers.forEach(user => saveUser(user));
  }
};