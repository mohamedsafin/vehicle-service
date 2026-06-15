import api from './api';

export const adminApi = {
  login: (credentials) => api.post('/admin/login', credentials),
  profile: () => api.get('/admin/me'),
  analytics: () => api.get('/analytics'),
  quotes: (params) => api.get('/quotes', { params }),
  quoteDetails: (id) => api.get(`/quotes/${id}`),
  updateQuoteStatus: (id, status) => api.put(`/quotes/${id}/status`, { status }),
  deleteQuote: (id) => api.delete(`/quotes/${id}`),
  contacts: () => api.get('/contacts'),
  deleteContact: (id) => api.delete(`/contacts/${id}`),
  fleet: () => api.get('/fleet'),
  createFleet: (formData) =>
    api.post('/fleet', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateFleet: (id, formData) =>
    api.put(`/fleet/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteFleet: (id) => api.delete(`/fleet/${id}`),
  getContactSettings: () => api.get('/settings/contact'),
  updateContactSettings: (data) => api.put('/settings/contact', data),
};
