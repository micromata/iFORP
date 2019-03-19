import { exceptionWithHttpStatus } from './request';
import { validateToken } from './auth';
import { getLogger } from '../lib/get-logger';
const logger = getLogger('Auth middleware');

export const ensureAuthentication = (request, response, next) => {
  const authorizationHeader = request.get('Authorization');
  const token = (authorizationHeader || '').substring(7);
  if (!token) {
    throw exceptionWithHttpStatus(`'Authorization' header is missing.`, 401);
  }

  validateToken(token)
    .then(decoded => {
      request.userData = decoded;
      next();
    })
    .catch(error => {
      logger.error(error);
      throw exceptionWithHttpStatus('Token invalid or malformed.', 401);
    });
};
