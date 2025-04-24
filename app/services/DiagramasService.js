import api, { config } from './Api';

const getAllDiagrams = () => api.get(`/DiagramasFlujo`);
const getDiagramById = id => api.get(`/DiagramasFlujo/${id}`);
const deleteDiagram = id => api.delete(`/DiagramasFlujo/${id}`);
const createDiagram = (bodyParameters, conf) =>
  api.post(`/DiagramasFlujo`, bodyParameters, conf);
const updateDiagram = (id, bodyParameters, conf) =>
  api.put(`/DiagramasFlujo/${id}`, bodyParameters, conf);

export {
  getAllDiagrams,
  getDiagramById,
  deleteDiagram,
  createDiagram,
  updateDiagram,
};
