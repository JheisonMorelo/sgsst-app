import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Perfil ──────────────────────────────────────────────────────────────────
export const getPerfil      = ()       => api.get('/perfil').then(r => r.data);
export const savePerfil     = (data)   => api.put('/perfil', data).then(r => r.data);

// ─── Estándares completados ──────────────────────────────────────────────────
export const getCompletados     = ()   => api.get('/completados').then(r => r.data);
export const marcarCompletado   = (id) => api.post(`/completados/${id}`).then(r => r.data);
export const desmarcarCompletado= (id) => api.delete(`/completados/${id}`).then(r => r.data);

// ─── Documentos ──────────────────────────────────────────────────────────────
export const getDocumentos  = ()       => api.get('/documentos').then(r => r.data);
export const saveDocumento  = (id, data) => api.put(`/documentos/${id}`, data).then(r => r.data);

// ─── Notas ───────────────────────────────────────────────────────────────────
export const getNotas       = ()       => api.get('/notas').then(r => r.data);
export const saveNota       = (id, texto) => api.put(`/notas/${id}`, { texto }).then(r => r.data);

// ─── Calendario ──────────────────────────────────────────────────────────────
export const getCalendario       = ()     => api.get('/calendario').then(r => r.data);
export const marcarObligacion    = (key)  => api.post('/calendario', { key }).then(r => r.data);
export const desmarcarObligacion = (key)  => api.delete('/calendario', { data: { key } }).then(r => r.data);

// ─── Health ───────────────────────────────────────────────────────────────────
export const checkHealth = () => api.get('/health').then(r => r.data);

export default api;
