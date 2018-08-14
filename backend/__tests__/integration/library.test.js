import path from 'path';
import { createTestDatabaseConnection } from '../setup';
import { get, post } from '../request';
import { rmdir } from '../../src/utils/fs';
import { getConfiguration } from '../../src/get-configuration';
import { createTokenFor } from '../../src/utils/auth';

describe('/library', () => {
  let connection;
  let authToken;
  beforeAll(async () => {
    authToken = await createTokenFor({ emailAddress: 'devnull@127.0.0.1' });
    connection = createTestDatabaseConnection();
    await connection.connect();
  });

  afterAll(async () => {
    await rmdir(getConfiguration().upload.directory);
    await connection.close();
  });

  describe('/upload', () => {
    describe('POST', () => {
      it('should process ZIP archives containing HTML files', () => {
        return post('/library/upload')
          .set('Authorization', 'Bearer ' + authToken)
          .attach('file', path.resolve(__dirname, '../dummy-project.zip'))
          .expect(200);
      });
      it('should handle dupes', () => {
        return post('/library/upload')
          .set('Authorization', 'Bearer ' + authToken)
          .attach('file', path.resolve(__dirname, '../dummy-project.zip'))
          .expect(200);
      });
      it('should return HTTP 400 if no file was attached', () => {
        return post('/library/upload')
          .set('Authorization', 'Bearer ' + authToken)
          .expect(400);
      });
      it('should return HTTP 413 for files exceeding max file size', () => {
        // TODO
      });
    });
  });

  describe('//project/.*/', () => {
    it('should throw if one tries to do a path traversal', () => {
      return post('/library/upload')
        .set('Authorization', 'Bearer ' + authToken)
        .field('directoryName', 'pathtrav')
        .attach('file', path.resolve(__dirname, '../dummy-project.zip'))
        .expect(200)
        .then(() =>
          get('/library/pathtrav/../../../../../../../../etc/passwd')
            .set('Authorization', 'Bearer ' + authToken)
            .expect(400)
        );
    });
    it('should return files associated with uploaded projects', () => {
      return post('/library/upload')
        .set('Authorization', 'Bearer ' + authToken)
        .field('directoryName', 'testset')
        .attach('file', path.resolve(__dirname, '../dummy-project.zip'))
        .expect(200)
        .then(() =>
          get('/library/testset/dist/app/app.4c457b2340cfeaa48b77.bundle.js')
            .set('Authorization', 'Bearer ' + authToken)
            .expect(200)
        );
    });
  });

  describe('/files', () => {
    describe('GET', () => {
      it('should return a list of uploaded files', async () => {
        const res = await get('/library/files')
          .set('Authorization', 'Bearer ' + authToken)
          .expect(200);
        expect(res.body.length > 0);
      });
    });
    describe('/files/:id', () => {
      it('should return a dir by given ID', async () => {
        const res = await get('/library/files')
          .set('Authorization', 'Bearer ' + authToken)
          .expect(200);
        const dir = res.body.pop();
        const exampleId = dir.pages.pop().id;
        await get('/library/files/' + exampleId)
          .set('Authorization', 'Bearer ' + authToken)
          .expect(200);
      });
      it('should return a 404 for non existent files', async () => {
        await get('/library/files/1337')
          .set('Authorization', 'Bearer ' + authToken)
          .expect(404);
      });
    });
  });
});
