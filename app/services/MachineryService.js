import api, { config } from './Api';

const getAllAreasKnowledge = () => api.get(`/areasconocimiento`);
const getMachineryById = id => api.get(`/equipos/${id}`);
const getMachineryTypeMedia = id => api.get(`/equipos/${id}/tipomedios`);
const getMachineryMediaById = (id, idMedia) =>
  api.get(`/equipos/${id}/medios/${idMedia}`);
const deleteMachinery = id => api.delete(`/equipos/${id}`);
const createMachinery = (bodyParameters, conf) => api.post(`/equipos`, bodyParameters, conf);
const moveAreaKnowledge = (id, bodyParameters) =>
  api.put(`/areasconocimiento/${id}/mover`, bodyParameters);
const updateMachinery = (id, bodyParameters, conf) =>
  api.put(`/equipos/${id}`, bodyParameters, conf);

export {
  getAllAreasKnowledge,
  getMachineryMediaById,
  createMachinery,
  getMachineryById,
  updateMachinery,
  getMachineryTypeMedia,
  deleteMachinery,
  moveAreaKnowledge,
};
