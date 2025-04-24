import api, { config } from './Api';

const getAllGroups = () => api.get('/grupos');

const createGroup = (bodyParameters, token) =>
  api.post(
    '/grupos',
    bodyParameters,
    config({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NTk3NjYyMzcsImV4cCI6MTU2MDM3MTAzNywiaWF0IjoxNTU5NzY2MjM3fQ.0LM7jWHCUugWgx6uwfawoeoaI6EiPTfiCOAKYy22u90',
    }),
  );

const updateGroup = (id, bodyParameters, token) =>
  api.put(
    `/grupos/${id}`,
    bodyParameters,
    config({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NTk3NjYyMzcsImV4cCI6MTU2MDM3MTAzNywiaWF0IjoxNTU5NzY2MjM3fQ.0LM7jWHCUugWgx6uwfawoeoaI6EiPTfiCOAKYy22u90',
    }),
  );

const deleteGroup = (id, bodyParameters, token) =>
  api.delete(
    `/grupos/${id}`,
    bodyParameters,
    config({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NTk3NjYyMzcsImV4cCI6MTU2MDM3MTAzNywiaWF0IjoxNTU5NzY2MjM3fQ.0LM7jWHCUugWgx6uwfawoeoaI6EiPTfiCOAKYy22u90',
    }),
  );

const getGroupById = (id, bodyParameters, token) =>
  api.get(
    `/grupos/${id}`,
    bodyParameters,
    config({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NTk3NjYyMzcsImV4cCI6MTU2MDM3MTAzNywiaWF0IjoxNTU5NzY2MjM3fQ.0LM7jWHCUugWgx6uwfawoeoaI6EiPTfiCOAKYy22u90',
    }),
  );

const setGroupAccess = (id, bodyParameters, token) =>
  api.post(
    `/grupos/${id}/accesos`,
    bodyParameters,
    config({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NTk3NjYyMzcsImV4cCI6MTU2MDM3MTAzNywiaWF0IjoxNTU5NzY2MjM3fQ.0LM7jWHCUugWgx6uwfawoeoaI6EiPTfiCOAKYy22u90',
    }),
  );

const getAccessDiagrams = (idGrupo) => api.get(`/grupos/${idGrupo}/diagramas`);
const putAccessDiagrams = (idGrupo, json) => api.post(`/grupos/AccessDiagramaByGroup/${idGrupo}`, json);

export {
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  setGroupAccess,
  getAccessDiagrams,
  putAccessDiagrams

};
