import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { getRepository } from 'typeorm';
import yauzl from 'yauzl-promise';
import getLogger from '../lib/get-logger';
import {
  bytesToMegaBytes,
  exceptionWithHttpStatus,
  megaBytesToBytes
} from '../lib/utils';
import {
  extractDocumentBody,
  extractDocumentHead,
  extractHtmlElementAttributes,
  extractScriptAssets,
  extractStyleAssets
} from '../markup-util';
import { Directory } from '../orm/entity/directory';
import { Page } from '../orm/entity/page';

const MAX_FILE_SIZE = megaBytesToBytes(5);
const ACCEPTED_MIMES = ['application/zip'];
const UPLOAD_DIR = path.resolve(os.homedir(), '.iforp'); // FIXME: configurable upload dir

const logger = getLogger('library');

// Helpers
const ensureFile = file => {
  if (!file) {
    throw new exceptionWithHttpStatus('We need a file.', 400);
  }
};

const ensureFileSize = file => {
  if (file.size > MAX_FILE_SIZE) {
    throw new exceptionWithHttpStatus(
      `Maximum file size of ${bytesToMegaBytes(MAX_FILE_SIZE)} MB exceeded.`,
      413
    );
  }
};

const ensureMimeType = file => {
  if (!ACCEPTED_MIMES.includes(file.mimetype)) {
    throw new exceptionWithHttpStatus(`Wrong file type.`, 406);
  }
};

const entryIsDirectory = entry => entry.fileName.endsWith('/');

const removeFileExtension = originalZipName => {
  return originalZipName
    .split('.')
    .reverse()
    .pop();
};

const handleDirectory = async path => {
  await fs.mkdirp(path);
};

const handleFile = async (subDirectory, entry, zipFile) =>
  new Promise(async (resolve, reject) => {
    const destinationFile = path.resolve(
      UPLOAD_DIR,
      subDirectory,
      entry.fileName
    );
    const readStream = await zipFile.openReadStream(entry);
    const writeStream = await fs.createWriteStream(destinationFile);
    readStream.pipe(writeStream);
    writeStream.on('finish', () => {
      logger.info(`Extracted ${destinationFile}`);
      resolve();
    });
    writeStream.on('error', err => reject(err));
  });

// Service methods
export const uploadZip = async file => {
  logger.info('Uploaded: ', file);

  ensureFile(file);
  ensureFileSize(file);
  ensureMimeType(file);

  const zipFile = await yauzl.fromBuffer(file.buffer);
  let entry = await zipFile.readEntry();

  // The directory name where the htmlFiles are extracted to.
  const destinationDirectory = entryIsDirectory(entry)
    ? entry.fileName.substring(0, entry.fileName.length - 1)
    : removeFileExtension(file.originalname);

  // Directory name, if the ZIP doesn't contain a top level folder
  const subDirectory = entryIsDirectory(entry)
    ? ''
    : removeFileExtension(file.originalname);

  do {
    if (entry.fileName.endsWith('/')) {
      const directoryPath = path.resolve(
        UPLOAD_DIR,
        subDirectory,
        entry.fileName
      );
      await handleDirectory(directoryPath);
      continue;
    }
    await handleFile(subDirectory, entry, zipFile);
  } while ((entry = await zipFile.readEntry()));

  logger.info('Done with Unzipping.');
  // Save dummy directory in the database
  const directory = new Directory();
  directory.name = destinationDirectory;

  directory.pages = [];
  const htmlFiles = (
    (await fs.readdir(path.resolve(UPLOAD_DIR, destinationDirectory))) || []
  ).filter(fileName => {
    return (
      (fileName || '')
        .split('.')
        .pop()
        .trim() === 'html'
    );
  });

  htmlFiles.forEach(file => {
    const fileContents = fs
      .readFileSync(path.resolve(UPLOAD_DIR, destinationDirectory, file))
      .toString();
    const name = file;
    const body = extractDocumentBody(fileContents);
    const head = extractDocumentHead(fileContents);
    const css = extractStyleAssets(fileContents, `${destinationDirectory}`);
    const js = extractScriptAssets(fileContents, `${destinationDirectory}`);
    const htmlElementAttributes = extractHtmlElementAttributes(fileContents);
    directory.pages.push({
      name,
      body,
      head,
      assets: [...css, ...js],
      htmlElementAttributes
    });
  });

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
