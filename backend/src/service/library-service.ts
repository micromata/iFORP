import { getRepository } from 'typeorm';
import { Directory } from '../orm/entity/Directory';

export const find = async () => {
  const repo = getRepository(Directory);
  return repo.find();
};
