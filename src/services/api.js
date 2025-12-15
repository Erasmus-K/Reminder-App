import axios from 'axios';

const API_BASE_URL = 'https://json-server-vercel-rqie.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const activityAPI = {
  getAll: () => api.get('/api/activities'),
  getById: (id) => api.get(`/api/activities/${id}`),
  create: (activity) => api.post('/api/activities', activity),
  update: (id, activity) => api.put(`/api/activities/${id}`, activity),
  delete: (id) => api.delete(`/api/activities/${id}`),
};

export default api;