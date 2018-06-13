import path from 'path';
import yauzl from 'yauzl-promise';
import { getRepository } from 'typeorm';
import { getLogger } from '../lib/get-logger';
import {
  ensureFile,
  ensureFileSize,
  ensureMimeType,
  exceptionWithHttpStatus,
  extractZip,
  removeFileExtension
} from '../lib/utils';
import { processHtmlFile } from '../markup-util';
import { Asset } from '../orm/entity/asset';
import { Directory } from '../orm/entity/directory';
import { Page } from '../orm/entity/page';
import { getConfiguration } from '../get-configuration';

const logger = getLogger('library');

const { upload: uploadOptions } = getConfiguration();

// Service methods
export const uploadZip = async (file, userDefinedDirName = '') => {
  ensureFile(file);
  ensureFileSize(file, uploadOptions.maxFileSize);
  ensureMimeType(file, uploadOptions.acceptedMimes);

  logger.info(`Processing "${file.originalname}"`);

  const fileNameWithoutExtension = removeFileExtension(file.originalname);
  const directoryName = userDefinedDirName.trim() || fileNameWithoutExtension;
  const extractionBasePath = path.resolve(
    uploadOptions.directory,
    directoryName
  );
  const extractedFiles = await extractZip(
    await yauzl.fromBuffer(file.buffer),
    extractionBasePath
  );

  logger.info('Done with Unzipping.');

  const htmlFiles = extractedFiles.filter(fileName => {
    return (
      (fileName || '')
        .split('.')
        .pop()
        .trim() === 'html'
    );
  });

  const directory = new Directory();
  directory.name = directoryName;
  directory.pages = htmlFiles.map(file =>
    processHtmlFile(file, extractionBasePath)
  );

  const saved = await getRepository(Directory).save(directory);
  logger.info('Saved the directory to the database.');
  return saved;
};

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

// return raw asset
export const getAssetPath = async assetId => {
  const repository = getRepository(Asset);
  const asset = await repository.findOne(assetId);
  if (!asset)
    throw exceptionWithHttpStatus(`Asset with ID ${assetId} not found.`, 404);
  return asset;
};
