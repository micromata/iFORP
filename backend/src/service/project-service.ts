import superb from 'superb';
import { getRepository } from 'typeorm';
import { Project } from '../orm/entity/Project';
import { Whiteboard } from '../orm/entity/Whiteboard';

export const find = () => {
  const repo = getRepository(Project);
  return repo.find();
};

export const save = () => {
  const repo = getRepository(Project);

  const whiteboard = new Whiteboard();
  whiteboard.name = 'Default Whiteboard';

  const project = new Project();
  project.name = `A ${superb()} Project`;
  project.whiteboards = [whiteboard];

  return repo.save(project);
};

export const findById = id => {
  const repo = getRepository(Project);
  return repo.findOne(id);
};

export const update = async (id, base) => {
  const repo = getRepository(Project);
  const origProject = await repo.findOne(id);
  const patched = { ...origProject, ...base } as Project;
  return repo.save(patched);
};
