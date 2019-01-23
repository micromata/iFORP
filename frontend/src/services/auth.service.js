import jwt from 'jsonwebtoken';

const tokenSecret = 'TODO: make configurable';
const storageKey = 'iforp-token';

export const setToken = token => {
  sessionStorage.setItem(storageKey, token);
};

export const getToken = () => {
  return sessionStorage.getItem(storageKey);
};

export const getUserFromToken = () => {
  const token = getToken();
  return jwt.decode(token);
};

export const deleteToken = () => {
  sessionStorage.removeItem(storageKey);
};

export const verifyToken = () => {
  const token = getToken();

  try {
    jwt.verify(token, tokenSecret);
    return true;
  } catch (error) {
    deleteToken()
    return false;
  }
};
