import api, { config } from './Api';

const getAllAreasKnowledge = () => api.get(`/areasconocimiento`);
const getDocumentById = id => api.get(`/documentos/${id}`);
const deleteDocument = id => api.delete(`/documentos/${id}`);
const getDocumentTypeMedia = id => api.get(`/documentos/${id}/tipomedios`);
const getDocumentMediaById = (id, idMedia) =>
  api.get(`/documentos/${id}/medios/${idMedia}`);
const createDocument = (bodyParameters, conf) =>
  api.post(`/documentos`, bodyParameters, conf);
const moveAreaKnowledge = (id, bodyParameters) =>
  api.put(`/areasconocimiento/${id}/mover`, bodyParameters);
const updateDocument = (id, bodyParameters, conf) =>
  api.put(`/documentos/${id}`, bodyParameters, conf);

export {
  getAllAreasKnowledge,
  createDocument,
  getDocumentMediaById,
  getDocumentTypeMedia,
  getDocumentById,
  updateDocument,
  deleteDocument,
  moveAreaKnowledge,
};
