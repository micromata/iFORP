import { get, patch, post } from '../util/request';
import { createTestDatabaseConnection } from '../util/setup';

function createTestProject(testProjectName: string): any {
  return post('/projects')
    .send({ name: testProjectName })
    .expect(200);
}

describe('/projects', () => {
  const testProjectName = 'My test project';
  const testWhiteboardName = 'My test Whiteboard';

  let connection;

  beforeAll(async () => {
    connection = createTestDatabaseConnection();
    await connection.connect();
  });

  afterAll(() => {
    connection.close();
  });

  describe('POST', () => {
    it('should create and return a project', () =>
      createTestProject(testProjectName).then(res => {
        expect(res.body.id).toBeGreaterThan(0);
        expect(res.body.name).toEqual(testProjectName);
        expect(res.body.whiteboards).toHaveLength(1);
      }));
  });

  describe('GET', () => {
    it('should return a list of projects', () =>
      createTestProject(testProjectName).then(() =>
        get('/projects')
          .expect(200)
          .then(res => {
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.pop().name).toEqual(testProjectName);
          })
      ));
  });

  describe('/:projectId', () => {
    describe('GET', () => {
      it('should return a project with the given ID', () =>
        createTestProject(testProjectName).then(saveRes => {
          const savedProject = saveRes.body;
          return get(`/projects/${savedProject.id}`)
            .expect(200)
            .then(fetchRes => {
              expect(fetchRes.body.id).toEqual(savedProject.id);
            });
        }));
    });
    describe('PATCH', () => {
      it('should update a project by id', () =>
        createTestProject(testProjectName).then(saveRes => {
          const savedProject = saveRes.body;
          return patch(`/projects/${savedProject.id}`)
            .send({ name: 'Replaced' })
            .expect(200)
            .then(patchRes => {
              expect(patchRes.body.name).toEqual('Replaced');
            });
        }));
    });
    describe('/whiteboards', () => {
      describe('GET', () => {
        it('should return all whiteboards of a project', () =>
          createTestProject(testProjectName).then(saveRes =>
            get(`/projects/${saveRes.body.id}/whiteboards`)
              .expect(200)
              .then(fetchRes => {
                expect(fetchRes.body.length).toBeGreaterThan(0);
                expect(fetchRes.body.pop().name).toEqual('Default Whiteboard');
              })
          ));
      });
      describe('POST', () => {
        it('should add a whiteboard to an existing project', async () => {
          const testProject = (await createTestProject(testProjectName).expect(
            200
          )).body;
          return post(`/projects/${testProject.id}/whiteboards`)
            .send({ name: testWhiteboardName })
            .expect(200)
            .then(() =>
              get(`/projects/${testProject.id}/whiteboards`)
                .expect(200)
                .then(res => {
                  expect(res.body).toBeTruthy();
                  expect(
                    res.body.filter(
                      whiteboard => whiteboard.name === testWhiteboardName
                    )
                  ).toBeTruthy();
                })
            );
        });
      });
    });
  });
});
