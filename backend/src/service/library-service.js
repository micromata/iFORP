import path from 'path';
import yauzl from 'yauzl-promise';
import fs from 'fs-extra';
import { getRepository } from 'typeorm';
import { getLogger } from '../lib/get-logger';
import {
  extractZip,
  getFileExtension,
  getPathSegments,
  removeFileExtension,
  rmdir
} from '../utils/fs';
import { processHtmlFile } from '../utils/markup';
import { Directory } from '../orm/entity/directory';
import { Page } from '../orm/entity/page';
import { getConfiguration } from '../get-configuration';
import {
  ensureFileSize,
  ensureMimeType,
  ensureValue,
  exceptionWithHttpStatus
} from '../utils/request';

const logger = getLogger('library');

const { upload: uploadOptions } = getConfiguration();

function getExtractionBasePath(baseDir, directoryName, ranTimes = 0) {
  const extractionPath = path.resolve(
    baseDir,
    ranTimes ? directoryName + '-' + ranTimes : directoryName
  );
  if (fs.existsSync(extractionPath)) {
    return getExtractionBasePath(baseDir, directoryName, ranTimes + 1);
  }
  return extractionPath;
}

// Service methods
export const uploadZip = async (file, userDefinedDirName = '') => {
  ensureValue(file);
  ensureFileSize(file, uploadOptions.maxFileSize);
  ensureMimeType(file, uploadOptions.acceptedMimes);

  logger.info(`Processing "${file.originalname}"`);

  const directoryName =
    userDefinedDirName.trim() || removeFileExtension(file.originalname);
  const extractionBasePath = getExtractionBasePath(
    uploadOptions.directory,
    directoryName
  );

  const extractedFiles = await extractZip(
    await yauzl.fromBuffer(file.buffer),
    extractionBasePath
  );

  logger.info('Done with Unzipping.');

  const htmlFiles = extractedFiles.filter(fileName => {
    const fileExtension = getFileExtension(fileName);
    return fileExtension === 'html' || fileExtension === 'htm';
  });

  if (htmlFiles.length < 1) {
    await rmdir(extractionBasePath);
    throw exceptionWithHttpStatus(
      'You need to upload a Zip file containing HTML files',
      422 // unprocessable entity
    );
  }

  const directory = new Directory();
  directory.name = getPathSegments(extractionBasePath).pop();
  directory.pages = htmlFiles.map(file =>
    processHtmlFile(file, uploadOptions.directory, extractionBasePath)
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

export const getProjectFile = async fileAbsPath => {
  const file = path.join(uploadOptions.directory, fileAbsPath);
  const mask = path.join(uploadOptions.directory);
  const rel = path.relative(mask, file);
  if (rel.indexOf('../') !== -1)
    throw exceptionWithHttpStatus(`You aren't evil, aren't you?`, 400);
  if (!(await fs.exists(file))) {
    throw exceptionWithHttpStatus('File not found!', 404);
  }
  return file;
};
