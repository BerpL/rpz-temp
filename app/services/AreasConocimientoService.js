import api, { config } from './Api';

const getAllAreasKnowledge = () => api.get(`/areasconocimiento`);
const getAreaKnowledgeById = id => api.get(`/areasconocimiento/${id}`);
const deleteAreaKnowledge = id => api.delete(`/areasconocimiento/${id}`);
const createAreasKnowledge = bodyParameters =>
  api.post(`/areasconocimiento`, bodyParameters);
const moveAreaKnowledge = (id, bodyParameters) =>
  api.put(`/areasconocimiento/${id}/mover`, bodyParameters);
const updateAreasKnowledge = (id, bodyParameters) =>
  api.put(`/areasconocimiento/${id}`, bodyParameters);

export {
  getAllAreasKnowledge,
  createAreasKnowledge,
  getAreaKnowledgeById,
  updateAreasKnowledge,
  deleteAreaKnowledge,
  moveAreaKnowledge,
};
