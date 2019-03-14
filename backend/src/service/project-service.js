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
  whiteboard.name = 'Standard Whiteboard';

  const project = new Project();
  project.name = `${superb.random()} Project`;
  project.whiteboards = [whiteboard];

  const view = new View();
  whiteboard.views = [];
  view.name = `Initiale View`;
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
    throw exceptionWithHttpStatus(`Project mit ID ${id} nicht gefunden.`, 404);
  }
  return project;
};

export const update = async (id, base) => {
  const repo = getRepository(Project);
  const origProject = await repo.findOne(id);
  if (!origProject) {
    throw exceptionWithHttpStatus(`Project mit ID ${id} nicht gefunden.`, 404);
  }
  const patched = { ...origProject, ...base };
  return repo.save(patched);
};

export const remove = async id => {
  const repo = getRepository(Project);
  const found = await repo.findOne(id);
  if (!found) {
    throw exceptionWithHttpStatus(
      `Das nicht existierende Projekte mit ID ${id} kann nicht gelöscht werden.`,
      404
    );
  }
  return repo.remove(found);
};
