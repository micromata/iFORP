const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? 'http://localhost:3000' : '';

export const post = (path, payload = {}) =>
  fetch(baseURL + path, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('id_token') || ''}`,
    },
    mode: isDev ? 'cors' : 'same-origin',
    method: 'POST',
  });
