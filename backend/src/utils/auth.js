import BCrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

export const createHash = async plainTextString =>
  BCrypt.hash(plainTextString, 10);
export const hashMatches = async (hashedString, plainTextString) =>
  BCrypt.compare(plainTextString, hashedString);
export const createToken = (payload, secret, options = {}) =>
  new Promise((resolve, reject) => {
    sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
export const createTokenFor = async subject =>
  createToken(
    {
      emailAddress: subject.emailAddress
    },
    'TODO: make configurable',
    {
      algorithm: 'HS256',
      expiresIn: '1 day'
    }
  );
export const validateToken = async token =>
  verify(token, 'TODO: make configurable');
