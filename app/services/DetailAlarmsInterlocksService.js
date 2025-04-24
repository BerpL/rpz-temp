import api, { config } from './Api';

const getDetailAlarmInterlock = id =>
  api.get(`/DetalleEnclavamientoAlarma/${id}`);
const deleteDetailAlarmInterlock = id =>
  api.delete(`/DetalleEnclavamientoAlarma/${id}`);
const createDetailAlarmInterlock = bodyParameters =>
  api.post(`/DetalleEnclavamientoAlarma`, bodyParameters);
const updateDetailAlarmInterlock = (id, bodyParameters) =>
  api.put(`/DetalleEnclavamientoAlarma/${id}`, bodyParameters);

export {
  getDetailAlarmInterlock,
  deleteDetailAlarmInterlock,
  createDetailAlarmInterlock,
  updateDetailAlarmInterlock,
};
