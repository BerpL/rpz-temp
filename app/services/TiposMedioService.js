import api, { config } from './Api';

const getAllMediaTypes = () => api.get('/tiposmedio');

export { getAllMediaTypes };
