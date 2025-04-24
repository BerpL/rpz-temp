import api, { config } from './Api';

const getAllNodesFlujosTree = () => api.get(`/arbolflujo`);
const getFlujosTreeById = id => api.get(`/arbolflujo/${id}`);
const deleteFlujosTree = id => api.delete(`/arbolflujo/${id}`);
const getFlujosByNode = id => api.get(`/arbolflujo/${id}/Flujos`);
// const getFlujosArchivos = id => api.get(`/arbolflujo/archives`);
const createFlujosTree = bodyParameters => api.post(`/arbolflujo`, bodyParameters);
const updateFlujosTree = (id, bodyParameters) =>
  api.put(`/arbolflujo/${id}`, bodyParameters);
const moveFlujosTree = (id, bodyParameters) =>
  api.put(`/arbolflujo/${id}/mover`, bodyParameters);

export {
  getAllNodesFlujosTree,
  getFlujosTreeById,
  deleteFlujosTree,
  getFlujosByNode,
  createFlujosTree,
  moveFlujosTree,
  updateFlujosTree,
};
