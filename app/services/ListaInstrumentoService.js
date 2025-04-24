import api, { config } from './Api';

const getListaInstrumentosId = id => api.get(`/ListaInstrumentos/${id}`);
const getListaInstrumentos = () => api.get(`/ListaInstrumentos`);
const createInstrumentList = bodyParameters =>
api.post(`/ListaInstrumentos`, bodyParameters);
const updateListaInstrumentos = (id, bodyParameters) =>
api.put(`/ListaInstrumentos/${id}`, bodyParameters);
const deleteListaInstrumentos = id => api.delete(`/ListaInstrumentos/${id}`);

export {
  getListaInstrumentosId,
  getListaInstrumentos,
  createInstrumentList,
  updateListaInstrumentos,
  deleteListaInstrumentos,
};
