import { Router } from 'express';
import { getRepository } from 'typeorm';
import { View } from '../orm/entity/view';
import * as projectService from '../service/project-service';
import * as whiteboardService from '../service/whiteboard-service';
import * as viewService from '../service/view-service';
import { getLogger } from '../lib/get-logger';
import { getRequestHandler } from '../utils/request';
import { ensureAuthentication } from '../utils/middleware';

const projects = Router();

const handleRequest = getRequestHandler(getLogger('projects'));

projects.use(ensureAuthentication);

projects.get(
  '/',
  handleRequest(async (_, res) => {
    return res.send(await projectService.find());
  })
);

projects.post(
  '/',
  handleRequest(async (req, res) => {
    return res.send(await projectService.save(req.body));
  })
);

projects.get(
  '/:projectId',
  handleRequest(async (req, res) => {
    const project = await projectService.findById(req.params.projectId);
    return res.send(project);
  })
);

projects.patch(
  '/:projectId',
  handleRequest(async (req, res) => {
    return res.send(
      await projectService.update(req.params.projectId, req.body)
    );
  })
);

projects.get(
  '/:projectId/whiteboards',
  handleRequest(async (req, res) => {
    return res.send(await whiteboardService.find(req.params.projectId));
  })
);

projects.post(
  '/:projectId/whiteboards',
  handleRequest(async (req, res) => {
    return res.send(await whiteboardService.save(req.params.projectId));
  })
);

projects.delete(
  '/:projectId/whiteboards/:whiteboardId',
  handleRequest(async (req, res) => {
    await whiteboardService.remove(req.params.whiteboardId);
    return res.send();
  })
);

projects.patch(
  '/:projectId/whiteboards/:whiteboardId',
  handleRequest(async (req, res) => {
    return res.send(
      await whiteboardService.update(req.params.whiteboardId, req.body)
    );
  })
);

projects.get(
  '/:projectId/whiteboards/:whiteboardId/views',
  handleRequest(async (req, res) => {
    return res.send(
      await viewService.getByWhiteboardId(req.params.whiteboardId)
    );
  })
);

projects.post(
  '/:projectId/whiteboards/:whiteboardId/views',
  handleRequest(async (req, res) => {
    return res.send(await viewService.save(req.params.whiteboardId, req.body));
  })
);

projects.get(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  handleRequest(async (req, res) => {
    return res.send(await viewService.findById(req.params.viewId));
  })
);

projects.delete(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  handleRequest(async (req, res) => {
    return res.send(await viewService.remove(req.params.viewId));
  })
);

projects.patch(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  handleRequest(async (req, res) => {
    const viewRepo = getRepository(View);
    const orig = await viewRepo.findOne(req.params.viewId);
    const patch = req.body;
    const patched = {
      ...orig,
      ...patch
    };
    return res.send(await viewRepo.save(patched));
  })
);

projects.put(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  handleRequest(async (req, res) => {
    return res.send(await viewService.replace(req.params.viewId, req.body));
  })
);

export default projects;
