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
  getUsers: () => api.get('/users'),
  createUser: (user) => api.post('/users', user),
  login: async (email, password) => {
    const response = await api.get('/users');
    const user = response.data.find(u => u.email === email && u.password === password);
    return user ? { data: user } : null;
  },
};

export default api;