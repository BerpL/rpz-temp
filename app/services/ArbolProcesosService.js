import api, { config } from './Api';

const getAllTreeProcess = () => api.get(`/arbolproceso`);
const getTreeProcessById = id => api.get(`/arbolproceso/${id}`);
const deleteTreeProcess = id => api.delete(`/arbolproceso/${id}`);
const getProcessByNode = id => api.get(`/arbolproceso/${id}/procesos`);
const createTreeProcess = bodyParameters =>
  api.post(`/arbolproceso`, bodyParameters);
const moveTreeProcess = (id, bodyParameters) =>
  api.put(`/arbolproceso/${id}/mover`, bodyParameters);
const updateTreeProcess = (id, bodyParameters) =>
  api.put(`/arbolproceso/${id}`, bodyParameters);

export {
  getAllTreeProcess,
  getTreeProcessById,
  deleteTreeProcess,
  getProcessByNode,
  createTreeProcess,
  moveTreeProcess,
  updateTreeProcess,
};
