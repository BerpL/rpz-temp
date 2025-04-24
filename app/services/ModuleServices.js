import api from './Api';

const getAllModules = () => api.get('/modulos');

export { getAllModules };
