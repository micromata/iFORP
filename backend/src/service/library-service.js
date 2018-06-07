import { getRepository } from 'typeorm';
import { Directory } from '../orm/entity/directory';
import { Page } from '../orm/entity/page';
import { exceptionWithHttpStatus } from '../lib/utils';

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
  const page = await repo.findOne(pageId);
  if (!page) {
    throw exceptionWithHttpStatus(`Page with ID ${pageId} not found.`, 404);
  }
  return page;
};
