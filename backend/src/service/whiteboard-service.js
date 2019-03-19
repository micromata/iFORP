import { randomSuperbWord } from '../utils/superb-words';
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
      `Es wurden keine Whiteboards zu Projekt ${projectId} gefunden`,
      404
    );
  }

  return project.whiteboards;
};

export const save = async projectId => {
  const projectRepo = getRepository(Project);
  const whiteboardRepo = getRepository(Whiteboard);
  const project = await projectRepo.findOne(projectId);
  if (!project) {
    throw exceptionWithHttpStatus(
      `Whiteboard kann nicht in ein nicht bestehendes Projekt mit ID ${projectId} gespeichert werden.`,
      404
    );
  }

  const whiteboard = {
    name: `${randomSuperbWord()}es Whiteboard`,
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
      `Nicht vorhandenes Whiteboard mit ID ${id} kann nicht gelöscht werden.`,
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
      `Whiteboard mit ID ${id} kann nicht aktualisiert werden.`,
      404
    );
  }

  const patched = {
    ...orig,
    ...base
  };
  return whiteboardRepo.save(patched);
};
