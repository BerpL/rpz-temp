import api, { config } from './Api';

const getProcedureById = id => api.get(`/procesos/${id}`);
const deleteProcedure = id => api.delete(`/procesos/${id}`);
const createProcedure = (bodyParameters, conf) => api.post(`/procesos`, bodyParameters, conf);
const updateProcedure = (id, bodyParameters, conf) =>
  api.put(`/procesos/${id}`, bodyParameters, conf);

export { getProcedureById, deleteProcedure, createProcedure, updateProcedure };
