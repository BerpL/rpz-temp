import api, { config } from './Api';

const getArchivesByArea = id => api.get(`/arbolprincipal/${id}/archivos`);
const downloadArchive = id => api.get(`/archivos/${id}/download`);

export { getArchivesByArea, downloadArchive };
