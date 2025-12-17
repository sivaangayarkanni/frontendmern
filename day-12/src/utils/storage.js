// Mock database using localStorage
export const getUsers = () => {
  const users = localStorage.getItem('crm_users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('crm_users', JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const saveToken = (token) => {
  localStorage.setItem('crm_token', token);
};

export const getToken = () => {
  return localStorage.getItem('crm_token');
};

export const removeToken = () => {
  localStorage.removeItem('crm_token');
};