import { getRequest, postRequest } from './index';

export const getCheckSession = () => getRequest('/auth/check-session');
export const getLogout = () => getRequest('/auth/logout');

export const postLoginUser = (body) => postRequest('/auth/login', body);
export const postRegisterUser = (body) => postRequest('/auth/register', body);
export const postRegisterOwner = (body) =>
  postRequest('/auth/register/owner', body);
