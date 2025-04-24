import api, { config } from './Api';

const getAllIncomes = () => api.get('/ingresos');

export { getAllIncomes };
