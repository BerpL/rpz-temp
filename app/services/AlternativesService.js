import api, { config } from './Api';

const deleteAlternativeById = id => api.delete(`/alternativas/${id}`);

export { deleteAlternativeById };
