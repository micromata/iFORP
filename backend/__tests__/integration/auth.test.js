import jsonwebtoken from 'jsonwebtoken';
import { createTestDatabaseConnection } from '../setup';
import { post } from '../request';

describe('/auth', () => {
  let connection;
  beforeAll(async () => {
    connection = createTestDatabaseConnection();
    await connection.connect();
  });

  afterAll(async () => {
    await connection.close();
  });

  xdescribe('/register', () => {
    describe('POST', () => {
      it('should register a new user and respond with a valid token', async () =>
        post('/auth/register')
          .send({
            emailAddress: 'devnull@127.0.0.1',
            password: 'unsecure'
          })
          .expect(200)
          .then(response => {
            const { token } = response.body;
            const decoded = jsonwebtoken.decode(token);
            expect(decoded.emailAddress).toEqual('devnull@127.0.0.1');
          }));
      it('should error on register with duplicated email address', async () =>
        post('/auth/register')
          .send({
            emailAddress: 'devnull@127.0.0.1',
            password: 'unsecure'
          })
          .expect(409));
    });
  });
  xdescribe('/login', () => {
    describe('POST', () => {
      it('should error for non-existent users', () =>
        post('/auth/login')
          .send({
            emailAddress: 'hurzel',
            password: 'purzel'
          })
          .expect(401));
      it('should error for wrong credentials', () =>
        post('/auth/login')
          .send({
            emailAddress: 'devnull@127.0.0.1',
            password: 'hurzel'
          })
          .expect(401));
      it('should log in and respond with a valid token', () =>
        post('/auth/login')
          .send({
            emailAddress: 'devnull@127.0.0.1',
            password: 'unsecure'
          })
          .expect(200)
          .then(response => {
            const { token } = response.body;
            const decoded = jsonwebtoken.decode(token);
            expect(decoded.emailAddress).toEqual('devnull@127.0.0.1');
          }));
    });
  });
});
