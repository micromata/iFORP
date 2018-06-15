import path from 'path';
import { createTestDatabaseConnection } from '../setup';
import { get, post } from '../request';
import { rmdir } from '../../src/utils/fs';
import { getConfiguration } from '../../src/get-configuration';

describe('/library', () => {
  let connection;
  beforeAll(async () => {
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
          .attach('file', path.resolve(__dirname, '../dummy-project.zip'))
          .expect(200);
      });
      it('should return HTTP 400 if no file was attached', () => {
        return post('/library/upload').expect(400);
      });
      it('should return HTTP 413 for files exceeding max file size', () => {
        // TODO
      });
    });
  });

  describe('/files', () => {
    describe('GET', () => {
      it('should return a list of uploaded files', async () => {
        const res = await get('/library/files').expect(200);
        expect(res.body.length > 0);
      });
    });
    describe('/files/:id', () => {
      it('should return a dir by given ID', async () => {
        const res = await get('/library/files').expect(200);
        const dir = res.body.pop();
        const exampleId = dir.pages.pop().id;
        await get('/library/files/' + exampleId).expect(200);
      });
      it('should return a 404 for non existent files', async () => {
        await get('/library/files/1337').expect(404);
      });
    });
  });
});
