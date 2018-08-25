import { Router } from 'express';
import { getLogger } from '../lib/get-logger';
import { getRequestHandler } from '../utils/request';
import { register, login } from '../service/auth-service';

const auth = Router(); // eslint-disable-line new-cap
const logger = getLogger('auth');
const handleRequest = getRequestHandler(logger);

auth.post(
  '/register',
  handleRequest(async (req, res) => {
    return register(req, res);
  })
);

auth.post(
  '/login',
  handleRequest(async (req, res) => {
    return login(req, res);
  })
);

export default auth;
