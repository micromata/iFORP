import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const tokenSecret = 'TODO: make configurable';

export const createHash = async plainTextString =>
  bcrypt.hash(plainTextString, 10);
export const hashMatches = async (hashedString, plainTextString) =>
  bcrypt.compare(plainTextString, hashedString);
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
      emailAddress: subject.emailAddress,
      username: subject.username
    },
    tokenSecret,
    {
      algorithm: 'HS256',
      expiresIn: '1 day'
    }
  );
export const validateToken = async token => verify(token, tokenSecret);
