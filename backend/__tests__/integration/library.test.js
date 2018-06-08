import path from 'path';
import { createTestDatabaseConnection } from '../util/setup';
import { get, post } from '../util/request';

describe('/library', () => {
  let connection;
  beforeAll(async () => {
    connection = createTestDatabaseConnection();
    await connection.connect();
  });

  afterAll(() => {
    connection.close();
  });

  describe('/upload', () => {
    describe('POST', () => {
      it('should process ZIP archives containing HTML files', () => {
        return post('/library/upload')
          .attach('file', path.resolve(__dirname, '../dummy-project.zip'))
          .expect(200);
      });
    });
  });

  describe('/files', () => {
    describe('GET', () => {
      it('should return a list of uploaded files', async () => {
        const res = await get('/library/files').expect(200);
        expect(res.length > 0);
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
        await get('/library/files/1337')
          .expect(404);
      });
    });
  });
});
