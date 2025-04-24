import api, { config } from './Api';

const getAllNodesPidTree = () => api.get(`/arbolpids`);
const getPidTreeById = id => api.get(`/arbolpids/${id}`);
const deletePidTree = id => api.delete(`/arbolpids/${id}`);
const getPidsByNode = id => api.get(`/arbolpids/${id}/pids`);
const createPidTree = bodyParameters => api.post(`/arbolpids`, bodyParameters);
const movePidTree = (id, bodyParameters) =>
  api.put(`/arbolpids/${id}/mover`, bodyParameters);
const updatePidTree = (id, bodyParameters) =>
  api.put(`/arbolpids/${id}`, bodyParameters);

export {
  getAllNodesPidTree,
  getPidTreeById,
  deletePidTree,
  getPidsByNode,
  createPidTree,
  movePidTree,
  updatePidTree,
};
