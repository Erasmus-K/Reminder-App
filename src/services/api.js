import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://json-server-vercel-rflj.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const activityAPI = {
  getAll: () => api.get('/activities'),
  getByUserId: (userId) => api.get(`/activities?userId=${userId}`),
  getById: (id) => api.get(`/activities/${id}`),
  create: (activity) => api.post('/activities', activity),
  update: (id, activity) => api.put(`/activities/${id}`, activity),
  delete: (id) => api.delete(`/activities/${id}`),
};

export const authAPI = {
  login: async (email, password) => {
    // Demo users for testing
    const demoUsers = [
      { id: 1, name: "Alice Johnson", email: "alice@mail.com", password: "1234" },
      { id: 2, name: "Bob Smith", email: "bob@mail.com", password: "abcd" }
    ];
    
    const user = demoUsers.find(u => u.email === email && u.password === password);
    return user ? { data: user } : null;
  },
  createUser: (user) => {
    // For demo, create user with random ID
    const newUser = {
      ...user,
      id: Date.now()
    };
    return Promise.resolve({ data: newUser });
  },
};

export default api;