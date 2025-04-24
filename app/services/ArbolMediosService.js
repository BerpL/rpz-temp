import api, { config } from './Api';

const getAllMediaTree = () => api.get(`/mediosarbol`);
const getMediaTreeById = id => api.get(`/mediosarbol/${id}`);
const deleteMediaTree = id => api.delete(`/mediosarbol/${id}`);
const getMediosByArea = id => api.get(`/mediosarbol/${id}/medios`);
const createMediaTree = bodyParameters =>
  api.post(`/mediosarbol`, bodyParameters);
const moveMediaTree = (id, bodyParameters) =>
  api.put(`/mediosarbol/${id}/mover`, bodyParameters);
const updateMediaTree = (id, bodyParameters) =>
  api.put(`/mediosarbol/${id}`, bodyParameters);
const getAvailableMedia = formData => api.post(`/mediosarbol/medios`, formData);
const getAssignedMedia = formData =>
  api.post(`/mediosarbol/mediosAsignados`, formData);
const insertMedia = formData =>
  api.post(`/mediosarbol/insertarMedios`, formData);
const deleteMedia = formData => api.post(`/mediosarbol/quitarMedios`, formData);

export {
  getAllMediaTree,
  getMediaTreeById,
  deleteMediaTree,
  insertMedia,
  createMediaTree,
  moveMediaTree,
  getMediosByArea,
  deleteMedia,
  getAvailableMedia,
  updateMediaTree,
  getAssignedMedia,
};
