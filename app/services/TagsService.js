import api, { config } from './Api';

const getTag = id => api.get(`/Etiquetas/${id}`);
const deleteTag = id => api.delete(`/Etiquetas/${id}`);
const createTag = bodyParameters => api.post(`/Etiquetas`, bodyParameters);
const updateTag = (id, bodyParameters) =>
  api.put(`/Etiquetas/${id}`, bodyParameters);

export { getTag, deleteTag, createTag, updateTag };
