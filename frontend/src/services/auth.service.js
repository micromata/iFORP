import jwt from 'jsonwebtoken'

let currentToken;

export const setToken = (token) => {
  currentToken = token
}
export const getToken = () => {
  return currentToken
}
export const getUserFromToken = (token = currentToken) => {
  return jwt.decode(token);
}
export const deleteToken = () => {
  currentToken = null;
}
