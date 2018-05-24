import { getRepository } from 'typeorm';
import { Directory } from '../orm/entity/Directory';
import { Page } from '../orm/entity/Page';

export const getStrippedDirectories = async () => {
  return (await getRepository(Directory).find()).map(directory => ({
    ...directory,
    pages: directory.pages.map(page => ({
      id: page.id,
      name: page.name
    }))
  }));
};

export const getPage = async pageId => {
  const repo = getRepository(Page);
  return repo.findOne(pageId);
};
