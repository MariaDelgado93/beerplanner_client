import { getRequest, postRequest, putRequest } from './index';

export const getLocalsByPosition = async ({ lng, lat }) =>
  getRequest(`/local/location?distance=10000&long=${lng}&lat=${lat}`);

export const getAllLocals = async () => getRequest('/local/filter');
export const getFilterLocals = async (localName, localType) =>
  getRequest(`/local/filter?name=${localName}&localType=${localType}`);
export const getLocalById = async (id) => getRequest(`/local/search${id}`);

export const postCreateLocal = async (body) => postRequest('/local', body);

export const getOwnerLocals = async () => getRequest('/local/owner');
export const getAdminLocals = async () => getRequest('/local/admin');

export const activateLocal = async (id) => putRequest(`/local/activate/${id}`);
export const deactivateLocal = async (id) =>
  putRequest(`/local/deactivate/${id}`);

export const putFavouriteLocal = async (id) =>
  putRequest(`/local/favourite/${id}`);

export const putEditLocal = async (id, body) =>
  putRequest(`/local/${id}`, body);
