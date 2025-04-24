import api, { config } from './Api';

const getAllMainTreesKnowledge = () => api.get(`/arbolprincipal`);
const getMainTreeById = id => api.get(`/arbolprincipal/${id}`);
const deleteMainTree = id => api.delete(`/arbolprincipal/${id}`);
const createMainTree = bodyParameters =>
  api.post(`/arbolprincipal`, bodyParameters, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
const moveMainTree = (id, bodyParameters) =>
  api.put(`/arbolprincipal/${id}/mover`, bodyParameters);
const updateMainTree = (id, bodyParameters) =>
  api.put(`/arbolprincipal/${id}`, bodyParameters);
const getAllAreas = () => api.get(`/arbolprincipal/areas`);
const getAreaById = id => api.get(`/arbolprincipal/areas/${id}`);
export {
  getAllMainTreesKnowledge,
  getMainTreeById,
  getAreaById,
  deleteMainTree,
  createMainTree,
  moveMainTree,
  getAllAreas,
  updateMainTree,
};
