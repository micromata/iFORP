import { getRepository } from 'typeorm';
import { User } from '../orm/entity/user';
import { createHash, createTokenFor, hashMatches } from '../utils/auth';
import { exceptionWithHttpStatus } from '../utils/request';
import { violatesUniqueConstraint } from '../utils/error';

export const register = async (req, res) => {
  const repo = getRepository(User);
  const user = new User();
  const { emailAddress, password, username } = req.body;
  user.emailAddress = emailAddress.trim().toLowerCase();
  user.username = username;
  user.passwordHash = await createHash(password);
  try {
    const createdUser = await repo.save(user);
    const token = await createTokenFor(createdUser);
    return res.send({ token });
  } catch (error) {
    if (violatesUniqueConstraint(error)) {
      throw exceptionWithHttpStatus(
        'Die E-Mail-Adresse existiert bereits.',
        409
      );
    }
  }
};

export const login = async (req, res) => {
  const repo = getRepository(User);
  const { emailAddress, password } = req.body;
  const loginSubject = await repo.findOne({
    emailAddress: emailAddress.trim()
  });

  if (!loginSubject) {
    throw exceptionWithHttpStatus(
      'Die Anmeldeinformationen sind ungültig.',
      401
    );
  }

  const passwordMatches = await hashMatches(
    loginSubject.passwordHash,
    password
  );

  if (!passwordMatches) {
    throw exceptionWithHttpStatus(
      'Die Anmeldeinformationen sind ungültig.',
      401
    );
  }

  const token = await createTokenFor(loginSubject);
  res.send({ token });
};
