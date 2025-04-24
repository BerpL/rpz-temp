import api, { config } from './Api';

const getAlarmInterlock = id => api.get(`/AlarmasEnclavamientos/${id}`);
const getDetailAlarmInterlock = id =>
  api.get(`/AlarmasEnclavamientos/${id}/Detalle`);
const deleteAlarmInterlock = id => api.delete(`/AlarmasEnclavamientos/${id}`);
const createAlarmInterlock = bodyParameters =>
  api.post(`/AlarmasEnclavamientos`, bodyParameters);
const updateAlarmInterlock = (id, bodyParameters) =>
  api.put(`/AlarmasEnclavamientos/${id}`, bodyParameters);

export {
  getAlarmInterlock,
  getDetailAlarmInterlock,
  deleteAlarmInterlock,
  createAlarmInterlock,
  updateAlarmInterlock,
};
