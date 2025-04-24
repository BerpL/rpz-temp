import api, { config, Token } from './Api';

const getAllQuizzes = () => api.get(`/evaluaciones`);
const getQuizById = id => api.get(`/evaluaciones/${id}`);
const getQuizByIdDetail = id => api.get(`/evaluaciones/${id}/detalle`);
const getQuizKnowledgeAreas = id =>
  api.get(`/evaluaciones/${id}/AreasConocimiento`);
const getQuizzesReport = () => api.get(`/evaluaciones/reporte`);
const getQuizzesReportByQuiz = id => api.get(`/evaluaciones/${id}/reporte`);
const getQuizzesReportFilter = (id, groupId) => api.get(`/evaluaciones/${id}/reporte`);
const getQuizzesReportDetail = id =>
  api.get(`/evaluaciones/${id}/reporte/detalle`);
const getQuizUsers = id => api.get(`/evaluaciones/${id}/Usuarios`);
const getQuizGroups = id => api.get(`/evaluaciones/${id}/Grupos`);
const createQuiz = bodyFormData => api.post(`/evaluaciones`, bodyFormData);
const updateQuiz = (id, bodyFormData) =>
  api.put(`/evaluaciones/${id}`, bodyFormData);
const deleteQuiz = id => api.delete(`/evaluaciones/${id}`);
const addUser = (id, bodyFormData) =>
  api.put(`/evaluaciones/${id}/usuario`, bodyFormData);
const removeUser = (id, bodyFormData) =>
  api.put(`/evaluaciones/${id}/usuario/quitar`, bodyFormData);
const addGroup = (id, bodyFormData) =>
  api.put(`/evaluaciones/${id}/grupo`, bodyFormData);
const removeGroup = (id, bodyFormData) =>
  api.put(`/evaluaciones/${id}/grupo/quitar`, bodyFormData);
const changeIntents = (id, bodyFormData) =>
  api.put(`/evaluaciones/${id}/intentos`, bodyFormData);
const generateEvaluation = id =>
  api.get(
    `/evaluaciones/${id}/generar`,
    config({
      token: Token,
    }),
  );
const getFinishedEvaluations = () => api.get(`/evaluaciones/realizadas`);

const getScheduledEvaluations = () => api.get(`/evaluaciones/programadas`);

const saveUserEvaluation = (id, bodyFormData) =>
  api.put(
    `/evaluaciones/${id}/usuario/guardar`,
    bodyFormData,
    config({
      token: Token,
    }),
  );

const getUserEvaluationResult = id =>
  api.get(
    `/evaluaciones/${id}/usuario/resultado`,
    config({
      token: Token,
    }),
  );

export {
  getQuizUsers,
  changeIntents,
  getQuizGroups,
  getAllQuizzes,
  saveUserEvaluation,
  getUserEvaluationResult,
  getQuizById,
  getQuizByIdDetail,
  getQuizKnowledgeAreas,
  createQuiz,
  getQuizzesReportDetail,
  updateQuiz,
  deleteQuiz,
  addUser,
  getQuizzesReport,
  addGroup,
  getQuizzesReportByQuiz,
  getQuizzesReportFilter,
  removeGroup,
  generateEvaluation,
  removeUser,
  getFinishedEvaluations,
  getScheduledEvaluations,
};
