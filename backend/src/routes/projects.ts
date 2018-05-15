import { Router } from 'express';
import { getRepository } from 'typeorm';
import * as superb from 'superb';
import { Project } from '../orm/entity/Project';
import { Whiteboard } from '../orm/entity/Whiteboard';

const router = Router();

router.get('/', async (req, res) => {
  const repo = getRepository(Project);
  const projects = await repo.find();
  res.send(projects);
});

router.post('/', async (req, res) => {
  const repo = getRepository(Project);

  const whiteboard = new Whiteboard();
  whiteboard.name = 'Default Whiteboard';

  const project = new Project();
  project.name = `A ${superb()} Project`;
  project.whiteboards = [whiteboard];

  const saved = await repo.save(project);
  res.send(saved);
});

router.get('/:projectId', async (req, res) => {
  const repo = getRepository(Project);
  const found = await repo.findOne(req.params.projectId);
  res.send(found);
});

router.patch('/:projectId', async (req, res) => {
  const repo = getRepository(Project);
  const origProject = await repo.findOne(req.params.projectId);
  const patch = req.body;
  const patched = <Project>{ ...origProject, ...patch };
  const saved = await repo.save(patched);
  res.send(saved);
});

router.get('/:projectId/whiteboards', async (req, res) => {
  const repo = getRepository(Project);
  const project = await repo.findOne(req.params.projectId);
  res.send(project.whiteboards);
});

router.post('/:projectId/whiteboards', async (req, res) => {
  const projectRepo = getRepository(Project);
  const whiteboardRepo = getRepository(Whiteboard);
  const project = await projectRepo.findOne(req.params.projectId);
  const whiteboard = <Whiteboard>{
    ...req.body,
    project
  };

  const saved = await whiteboardRepo.save(whiteboard);
  res.send(saved);
});

router.delete('/:projectId/whiteboards/:whiteboardId', async (req, res) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const found = await whiteboardRepo.findOne(req.params.whiteboardId);
  res.send(found);
});

router.patch('/:projectId/whiteboards/:whiteboardId', async (req, res) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const orig = await whiteboardRepo.findOne(req.params.whiteboardId);
  const patch = req.body;
  const patched = <Whiteboard>{
    ...orig,
    ...patch
  };
  const saved = await whiteboardRepo.save(patched);
  res.send(saved);
});

router.get('/:projectId/whiteboards/:whiteboardId/views', async (req, res) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const whiteboard = await whiteboardRepo.findOne(req.params.whiteboardId);
  res.send(whiteboard.views);
});

router.post('/:projectId/whiteboards/:whiteboardId/views', (req, res) => {});

router.get(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Get whiteboard view by id
    res.send('Not implemented!');
  }
);

router.delete(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Delete whiteboard view by id
    res.send('Not implemented!');
  }
);

router.patch(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Modify whiteboard view by id
    res.send('Not implemented!');
  }
);

router.put(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Replace whiteboard view by id
    res.send('Not implemented!');
  }
);

export default router;
