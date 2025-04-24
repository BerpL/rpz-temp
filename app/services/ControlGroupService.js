import api, { config } from './Api';

const getAllNodesControlGroup = () => api.get(`/grupocontrol`);
const getNodeControlGroup = id => api.get(`/grupocontrol/${id}`);
const deleteNodeControlGroup = id => api.delete(`/grupocontrol/${id}`);
const getAllAlarmsInterlocksByControlGroup = id =>
  api.get(`/grupocontrol/${id}/AlarmasEnclavamientos`);
const getAllAlarmsInterlocksNoTagged = (id, idEtiquetaModulo) =>
  api.get(
    `/grupocontrol/${id}/AlarmasEnclavamientosNoEtiquetados/${idEtiquetaModulo}`,
  );
const getAllInterfacesByControlGroup = id =>
  api.get(`/grupocontrol/${id}/InterfacesEtiquetas`);
const createNodeControlGroup = bodyParameters =>
  api.post(`/grupocontrol`, bodyParameters, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
const moveNodeControlGroup = (id, bodyParameters) =>
  api.put(`/grupocontrol/${id}/mover`, bodyParameters);
const updateNodeControlGroup = (id, bodyParameters) =>
  api.put(`/grupocontrol/${id}`, bodyParameters);

export {
  getAllNodesControlGroup,
  getNodeControlGroup,
  deleteNodeControlGroup,
  createNodeControlGroup,
  getAllAlarmsInterlocksNoTagged,
  moveNodeControlGroup,
  getAllAlarmsInterlocksByControlGroup,
  getAllInterfacesByControlGroup,
  updateNodeControlGroup,
};
