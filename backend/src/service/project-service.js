import superb from 'superb';
import { getRepository } from 'typeorm';
import { Project } from '../orm/entity/project';
import { Whiteboard } from '../orm/entity/whiteboard';
import { View } from '../orm/entity/view';
import { exceptionWithHttpStatus } from '../utils/request';

export const find = async () => {
  const repo = getRepository(Project);
  return repo.find();
};

export const save = async base => {
  const repo = getRepository(Project);

  const whiteboard = new Whiteboard();
  whiteboard.name = 'Default Whiteboard';

  const project = new Project();
  project.name = `A ${superb.random()} Project`;
  project.whiteboards = [whiteboard];

  const view = new View();
  whiteboard.views = [];
  view.name = `Initial view`;
  view.hasFile = false;
  whiteboard.views.push(view);

  return repo.save({
    ...project,
    ...base
  });
};

export const findById = async id => {
  const repo = getRepository(Project);
  const project = await repo.findOne(id);
  if (!project) {
    throw exceptionWithHttpStatus(`Project with ID ${id} not found.`, 404);
  }
  return project;
};

export const update = async (id, base) => {
  const repo = getRepository(Project);
  const origProject = await repo.findOne(id);
  if (!origProject) {
    throw exceptionWithHttpStatus(`Project with ID ${id} not found.`, 404);
  }
  const patched = { ...origProject, ...base };
  return repo.save(patched);
};
