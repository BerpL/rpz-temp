import api, { config } from './Api';

const getInterfaceTags = id => api.get(`/InterfazEtiquetas/${id}`);
const getDetailInterfaceTags = id =>
  api.get(`/InterfazEtiquetas/${id}/Etiquetas`);
const deleteInterfaceTags = id => api.delete(`/InterfazEtiquetas/${id}`);
const createInterfaceTags = (bodyParameters, conf) =>
  api.post(`/InterfazEtiquetas`, bodyParameters, conf);
const updateInterfaceTags = (id, bodyParameters, conf) =>
  api.put(`/InterfazEtiquetas/${id}`, bodyParameters, conf);

export {
  getInterfaceTags,
  getDetailInterfaceTags,
  deleteInterfaceTags,
  createInterfaceTags,
  updateInterfaceTags,
};
