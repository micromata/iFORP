import { del, get, patch, post } from '../request';
import { createTestDatabaseConnection } from '../setup';

async function createAndGetTestProject(testProjectName) {
  const res = await post('/projects')
    .send({ name: testProjectName })
    .expect(200);
  return res.body;
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
      createAndGetTestProject(testProjectName).then(proj => {
        expect(proj.id).toBeGreaterThan(0);
        expect(proj.name).toEqual(testProjectName);
        expect(proj.whiteboards).toHaveLength(1);
      }));
  });

  describe('GET', () => {
    it('should return a list of projects', () =>
      createAndGetTestProject(testProjectName).then(() =>
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
        createAndGetTestProject(testProjectName).then(savedProject => {
          return get(`/projects/${savedProject.id}`)
            .expect(200)
            .then(fetchRes => {
              expect(fetchRes.body.id).toEqual(savedProject.id);
            });
        }));
    });

    describe('PATCH', () => {
      it('should update a project by id', () =>
        createAndGetTestProject(testProjectName).then(savedProject => {
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
          createAndGetTestProject(testProjectName).then(testProject =>
            get(`/projects/${testProject.id}/whiteboards`)
              .expect(200)
              .then(fetchRes => {
                expect(fetchRes.body.length).toBeGreaterThan(0);
                expect(fetchRes.body.pop().name).toEqual('Default Whiteboard');
              })
          ));
      });

      describe('POST', () => {
        it('should add a whiteboard to an existing project', async () => {
          const testProject = await createAndGetTestProject(testProjectName);
          await post(`/projects/${testProject.id}/whiteboards`)
            .send({ name: testWhiteboardName })
            .expect(200);
          const res = await get(
            `/projects/${testProject.id}/whiteboards`
          ).expect(200);

          expect(res.body).toBeTruthy();
          expect(
            res.body.filter(
              whiteboard => whiteboard.name === testWhiteboardName
            )
          ).toBeTruthy();
        });
      });
      describe('/:whiteboardId', () => {
        describe('DELETE', () => {
          it('should delete whiteboards by ID', async () => {
            const testProject = await createAndGetTestProject(
              'DeleteWhiteboardTest'
            );
            const whiteboards = (await get(
              '/projects/' + testProject.id + '/whiteboards'
            ).expect(200)).body;
            const whiteboard = whiteboards.pop();
            return del(
              `/projects/${testProject.id}/whiteboards/${whiteboard.id}`
            ).expect(200);
          });
        });
        describe('PATCH', () => {
          it('should update whiteboards', async () => {
            const testProject = await createAndGetTestProject(
              'UpdateWhiteboardTest'
            );
            const whiteboard = testProject.whiteboards.pop();
            const patched = (await patch(
              `/projects/${testProject.id}/whiteboards/${whiteboard.id}`
            )
              .send({ name: 'testset' })
              .expect(200)).body;
            expect(patched.name).toEqual('testset');
          });
        });
        // TODO implement
        /* describe("/views", function() {}); */
      });
    });
  });
});
