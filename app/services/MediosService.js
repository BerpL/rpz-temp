import api, { config } from './Api';

const getMedioById = id => api.get(`/medios/${id}`);
const deleteMedio = id => api.delete(`/medios/${id}`);
const updateMedio = (id, formData, conf) => api.put(`/medios/${id}`, formData, conf);
const createMedio = (formData, conf) => api.post(`/medios`, formData, conf);

export { getMedioById, deleteMedio, updateMedio, createMedio };
