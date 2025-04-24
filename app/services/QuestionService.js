import api, { config } from './Api';

const getAllQuestions = () => api.get('/preguntas');

const getQuestionById = id => api.get(`/preguntas/${id}`);

const deleteQuestionById = id => api.delete(`/preguntas/${id}`);

const getAlternativesByQuestion = id =>
  api.get(`/preguntas/${id}/alternativas`).then(x => x.data.data);

const createQuestion = (bodyParameters, token) =>
  api.post(
    '/preguntas',
    bodyParameters,
    config({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NTk3NjYyMzcsImV4cCI6MTU2MDM3MTAzNywiaWF0IjoxNTU5NzY2MjM3fQ.0LM7jWHCUugWgx6uwfawoeoaI6EiPTfiCOAKYy22u90',
    }),
  );

const updateQuestion = (id, bodyParameters, token) =>
  api.put(
    `/preguntas/${id}`,
    bodyParameters,
    config({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NTk3NjYyMzcsImV4cCI6MTU2MDM3MTAzNywiaWF0IjoxNTU5NzY2MjM3fQ.0LM7jWHCUugWgx6uwfawoeoaI6EiPTfiCOAKYy22u90',
    }),
  );

export {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestionById,
  getAlternativesByQuestion,
};
