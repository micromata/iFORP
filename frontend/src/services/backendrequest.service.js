import { getToken } from './auth.service';
const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? 'http://localhost:3001' : '';

export const post = (path, payload = {}) =>
  fetch(baseURL + path, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken() || ''}`,
    },
    mode: isDev ? 'cors' : 'same-origin',
    method: 'POST'
  });

export const uploadFile = (path, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken() || ''}`,
    },
    body: formData,
    mode: isDev ? 'cors' : 'same-origin',
    method: 'POST'
  };

  return fetch(baseURL + path, config);
}

export const get = (path = {}) =>
  fetch(baseURL + path, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken() || ''}`,
    },
    mode: isDev ? 'cors' : 'same-origin',
    method: 'GET'
  });

export const deleteEntity = (path, payload = {}) =>
  fetch(baseURL + path, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken() || ''}`,
    },
    mode: isDev ? 'cors' : 'same-origin',
    method: 'DELETE'
  });
