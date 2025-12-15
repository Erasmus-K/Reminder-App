import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const activityAPI = {
  getAll: () => api.get('/activities'),
  getById: (id) => api.get(`/activities/${id}`),
  create: (activity) => api.post('/activities', activity),
  update: (id, activity) => api.put(`/activities/${id}`, activity),
  delete: (id) => api.delete(`/activities/${id}`),
};

export default api;