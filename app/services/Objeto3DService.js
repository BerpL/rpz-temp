import api, { config } from './Api';

const getAllObject3Ds = () => api.get(`/Objetos3D`);
const getObject3DById = id => api.get(`/Objetos3D/${id}`);
const deleteObject3D = id => api.delete(`/Objetos3D/${id}`);
const createObject3D = (bodyParameters, conf) =>
  api.post(`/Objetos3D`, bodyParameters, conf);
const updateObject3D = (id, bodyParameters, conf) =>
  api.put(`/Objetos3D/${id}`, bodyParameters, conf);

export {
  getAllObject3Ds,
  getObject3DById,
  deleteObject3D,
  createObject3D,
  updateObject3D,
};
