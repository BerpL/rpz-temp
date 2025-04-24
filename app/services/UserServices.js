import api from './Api';

const getAllUsers = () => api.get('/usuarios');

const getUserById = id => api.get(`/usuarios/${id}`);

const deleteUser = id => api.delete(`/usuarios/${id}`);

const getAvailableUser = usuario => api.get(`/usuarios/disponible/${usuario}`);

const createUser = bodyParameters =>
  api.post('acceso/registro', bodyParameters);

const getReportIncomesByUser = id =>
  api.get(`/usuarios/${id}/reporte/ingresos`);

const getIncomesByUser = id => api.get(`/usuarios/${id}/ingresos`, {});

const updateUser = (id, bodyParameters) =>
  api.put(`/usuarios/${id}`, bodyParameters);

export {
  getAllUsers,
  createUser,
  deleteUser,
  getAvailableUser,
  getUserById,
  updateUser,
  getReportIncomesByUser,
  getIncomesByUser,
};
