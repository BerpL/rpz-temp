import api, { config } from './Api';

const getPidById = id => api.get(`/pids/${id}`);
const deletePid = id => api.delete(`/pids/${id}`);
const createPid = (bodyParameters, conf) => api.post(`/pids`, bodyParameters, conf);
const updatePid = (id, bodyParameters, conf) =>
  api.put(`/pids/${id}`, bodyParameters, conf);

export { getPidById, deletePid, createPid, updatePid };
