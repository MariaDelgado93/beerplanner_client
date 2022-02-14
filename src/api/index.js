//export const baseUrl = 'https://beer-planner.herokuapp.com/api';
export const baseUrl = 'http://localhost:4000/api';

const fetchOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * @param {string} endpoint
 * @returns {Promise}
 */
export const getRequest = async (endpoint) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'GET',
  }).then(async (res) => {
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data || response;
  });

/**
 * @param {string} endpoint
 * @param {object} body
 * @returns {Promise}
 */
export const postRequest = async (endpoint, body) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(body),
  }).then(async (res) => {
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data || response;
  });

/**
 * @param {string} endpoint
 * @param {object} body
 * @returns {Promise}
 */
export const putRequest = async (endpoint, body) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'PUT',
    body: JSON.stringify(body),
  }).then(async (res) => {
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data || response;
  });

/**
 * @param {string} endpoint
 * @param {object} body
 * @returns {Promise}
 */
export const deleteRequest = async (endpoint) =>
  fetch(`${baseUrl}${endpoint}`, {
    ...fetchOptions,
    method: 'DELETE',
  }).then(async (res) => {
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.message);
    }
    return response.data || response;
  });
