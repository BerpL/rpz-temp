import api from './Api';

const getAllVideos = () => api.get(`/videos3D`);
const getVideoById = id => api.get(`/videos3D/${id}`);
const getVideoBlob = url => api.get(`/storage?filePath=${url}`, {responseType: 'blob',});
const getImage = url => api.get(`/storage?filePath=${url}`, {responseType: 'blob',});
const deleteVideo = id => api.delete(`/videos3D/${id}`);
const createVideo = (bodyParameters, conf) =>
  api.post(`/videos3D`, bodyParameters, conf);
const updateVideo = (id, bodyParameters, conf) =>
  api.put(`/videos3D/${id}`, bodyParameters, conf);

const getAccessVideos = id => api.get(`/grupos/${id}/videos3d`);
const putAccessVideos = (idGroup, json) =>
  api.post(`/grupos/AccessVideo3DByGroup/${idGroup}`, json);

export {
  getAllVideos,
  getVideoById,
  deleteVideo,
  createVideo,
  updateVideo,
  getAccessVideos,
  putAccessVideos,
  getVideoBlob,
  getImage,

};
