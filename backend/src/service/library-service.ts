import { getRepository } from 'typeorm';
import { Directory } from '../orm/entity/Directory';

export const getStrippedDirectories = async () => {
  return (await getRepository(Directory).find()).map(directory => ({
    ...directory,
    pages: directory.pages.map(page => ({
      id: page.id,
      name: page.name
    }))
  }));
};
