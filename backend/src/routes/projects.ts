import { Router } from 'express';
import { getRepository } from 'typeorm';
import { View } from '../orm/entity/View';
import * as projectService from '../service/project-service';
import * as whiteboardService from '../service/whiteboard-service';
import * as viewService from '../service/view-service';

const projects = Router(); // eslint-disable-line new-cap

projects.get('/', async (_, res) => {
  res.send(await projectService.find());
});

projects.post('/', async (req, res) => {
  res.send(await projectService.save(req.body));
});

projects.get('/:projectId', async (req, res) => {
  res.send(await projectService.findById(req.params.projectId));
});

projects.patch('/:projectId', async (req, res) => {
  res.send(await projectService.update(req.params.projectId, req.body));
});

projects.get('/:projectId/whiteboards', async (req, res) => {
  res.send(await whiteboardService.find(req.params.projectId));
});

projects.post('/:projectId/whiteboards', async (req, res) => {
  res.send(await whiteboardService.save(req.params.projectId, req.body));
});

projects.delete('/:projectId/whiteboards/:whiteboardId', async (req, res) => {
  await whiteboardService.remove(req.params.whiteboardId);
  res.send();
});

projects.patch('/:projectId/whiteboards/:whiteboardId', async (req, res) => {
  res.send(await whiteboardService.update(req.params.whiteboardId, req.body));
});

projects.get(
  '/:projectId/whiteboards/:whiteboardId/views',
  async (req, res) => {
    res.send(await viewService.getByWhiteboardId(req.params.whiteboardId));
  }
);

projects.post(
  '/:projectId/whiteboards/:whiteboardId/views',
  async (req, res) => {
    res.send(await viewService.save(req.params.whiteboardId, req.body));
  }
);

projects.get(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    res.send(await viewService.findById(req.params.viewId));
  }
);

projects.delete(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    res.send(await viewService.remove(req.params.viewId));
  }
);

projects.patch(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    const viewRepo = getRepository(View);
    const orig = await viewRepo.findOne(req.params.viewId);
    const patch = req.body;
    const patched = {
      ...orig,
      ...patch
    } as View;
    res.send(await viewRepo.save(patched));
  }
);

projects.put(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    res.send(await viewService.replace(req.params.viewId, req.body));
  }
);

export default projects;
