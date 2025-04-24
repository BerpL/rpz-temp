import api, { config } from './Api';

const modifyAdvancedQuestions = (id, bodyForm) =>
  api.put(`/DetalleEvaluaciones/${id}/modificarAvanzadas`, bodyForm);
const modifyIntermediateQuestions = (id, bodyForm) =>
  api.put(`/DetalleEvaluaciones/${id}/modificarIntermedias`, bodyForm);
const modifyBasicQuestions = (id, bodyForm) =>
  api.put(`/DetalleEvaluaciones/${id}/modificarBasicas`, bodyForm);
const createDetail = bodyForm => api.post(`/DetalleEvaluaciones`, bodyForm);
const deleteDetail = id => api.delete(`/DetalleEvaluaciones/${id}`);
const addFixedQuestion = (id, bodyForm) =>
  api.put(`/DetalleEvaluaciones/${id}/AniadirPregunta`, bodyForm);
const removeFixedQuestion = (id, idPregunta) =>
  api.put(`/DetalleEvaluaciones/${id}/QuitarPregunta/${idPregunta}`);

export {
  modifyAdvancedQuestions,
  modifyIntermediateQuestions,
  modifyBasicQuestions,
  createDetail,
  addFixedQuestion,
  deleteDetail,
  removeFixedQuestion,
};
