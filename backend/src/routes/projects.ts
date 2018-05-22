import { Router } from 'express';
import { getRepository } from 'typeorm';
import superb from 'superb';
import { Project } from '../orm/entity/Project';
import { Whiteboard } from '../orm/entity/Whiteboard';
import { View } from '../orm/entity/View';
import * as projectService from '../service/project-service';
import * as whiteboardService from '../service/whiteboard-service';
import * as viewService from '../service/view-service';

const router = Router();

router.get('/', async (req, res) => {
  res.send(await projectService.find());
});

router.post('/', async (req, res) => {
  res.send(await projectService.save(req.body));
});

router.get('/:projectId', async (req, res) => {
  res.send(await projectService.findById(req.params.projectId));
});

router.patch('/:projectId', async (req, res) => {
  res.send(await projectService.update(req.params.projectId, req.body));
});

router.get('/:projectId/whiteboards', async (req, res) => {
  res.send(await whiteboardService.find(req.params.projectId));
});

router.post('/:projectId/whiteboards', async (req, res) => {
  res.send(await whiteboardService.save(req.params.projectId, req.body));
});

router.delete('/:projectId/whiteboards/:whiteboardId', async (req, res) => {
  res.send(await whiteboardService.remove(req.params.whiteboardId));
});

router.patch('/:projectId/whiteboards/:whiteboardId', async (req, res) => {
  res.send(await whiteboardService.update(req.params.whiteboardId, req.body));
});

router.get('/:projectId/whiteboards/:whiteboardId/views', async (req, res) => {
  res.send(await viewService.getByWhiteboardId(req.params.whiteboardId));
});

router.post('/:projectId/whiteboards/:whiteboardId/views', async (req, res) => {
  res.send(await viewService.save(req.params.whiteboardId, req.body));
});

router.get(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    res.send(await viewService.findById(req.params.viewId));
  }
);

router.delete(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    res.send(await viewService.remove(req.params.viewId));
  }
);

router.patch(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    const viewRepo = getRepository(View);
    const orig = await viewRepo.findOne(req.params.viewId);
    const patch = req.body;
    const patched = <View>{
      ...orig,
      ...patch
    };
    res.send(await viewRepo.save(patched));
  }
);

router.put(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  async (req, res) => {
    res.send(await viewService.replace(req.params.viewId, req.body));
  }
);

export default router;
