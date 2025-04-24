import api, { config } from './Api';

const getAllQuestionsByArea = id =>
  api.get(`/areasconocimiento/${id}/preguntas`);

const reorderQuestionsByArea = (id, body) =>
  api.post(`/areasconocimiento/${id}/preguntas/reordernar`, body);

export { getAllQuestionsByArea, reorderQuestionsByArea };
