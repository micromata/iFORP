import superb from 'superb';
import { getRepository } from 'typeorm';
import { Project } from '../orm/entity/project';
import { Whiteboard } from '../orm/entity/whiteboard';
import { View } from '../orm/entity/view';
import { exceptionWithHttpStatus } from '../utils/request';

export const find = async projectId => {
  const repo = getRepository(Project);
  const project = await repo.findOne(projectId);
  if (!project) {
    throw exceptionWithHttpStatus(
      `Cannot find whiteboards associated with project ID ${projectId}`,
      404
    );
  }
  return project.whiteboards;
};

export const save = async projectId => {
  const supportWord = superb.random();
  const projectRepo = getRepository(Project);
  const whiteboardRepo = getRepository(Whiteboard);
  const project = await projectRepo.findOne(projectId);
  if (!project) {
    throw exceptionWithHttpStatus(
      `Cannot save whiteboard to non-existent project with ID ${projectId}`,
      404
    );
  }
  const whiteboard = {
    name: `${supportWord.charAt(0).toUpperCase()}${supportWord.substr(
      1
    )} whiteboard`,
    project
  };
  const view = new View();

  whiteboard.views = [];
  view.name = `Initial view`;
  view.hasFile = false;
  whiteboard.views.push(view);

  const newWhiteboard = await whiteboardRepo.save(whiteboard);

  return {
    id: newWhiteboard.id,
    name: newWhiteboard.name
  };
};

export const remove = async id => {
  const whiteboardRepo = getRepository(Whiteboard);
  const found = await whiteboardRepo.findOne(id);
  if (!found) {
    throw exceptionWithHttpStatus(
      `Cannot delete non-existent whiteboard with ID ${id}`,
      404
    );
  }
  return whiteboardRepo.remove(found);
};

export const update = async (id, base) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const orig = await whiteboardRepo.findOne(id);
  if (!orig) {
    throw exceptionWithHttpStatus(
      `Cannot update whiteboard with ID ${id}`,
      404
    );
  }
  const patched = {
    ...orig,
    ...base
  };
  return whiteboardRepo.save(patched);
};
