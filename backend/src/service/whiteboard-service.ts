import * as superb from 'superb';
import { getRepository } from 'typeorm';
import { Project } from '../orm/entity/Project';
import { Whiteboard } from '../orm/entity/Whiteboard';
import { View } from '../orm/entity/View';

export const find = async projectId => {
  const repo = getRepository(Project);
  const project = await repo.findOne(projectId);
  return project.whiteboards;
};

export const save = async projectId => {
  const supportWord = superb();
  const projectRepo = getRepository(Project);
  const whiteboardRepo = getRepository(Whiteboard);
  const project = await projectRepo.findOne(projectId);
  const whiteboard = {
    name: `${supportWord.charAt(0).toUpperCase()}${supportWord.substr(
      1
    )} whiteboard`,
    project
  } as Whiteboard;
  const view = new View();

  whiteboard.views = [];
  view.name = `Initial view`;
  whiteboard.views.push(view);

  const newWhiteboard = await whiteboardRepo.save(whiteboard);

  return {
    id: newWhiteboard.id,
    name: newWhiteboard.name
  };
};

export const remove = async id => {
  const whiteboardRepo = getRepository(Whiteboard);
  return whiteboardRepo.remove(await whiteboardRepo.findOne(id));
};

export const update = async (id, base) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const orig = await whiteboardRepo.findOne(id);
  const patched = {
    ...orig,
    ...base
  } as Whiteboard;
  return whiteboardRepo.save(patched);
};
