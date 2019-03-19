import fs from 'fs-extra';
import path from 'path';
import { exceptionWithHttpStatus } from './request';

export const megaBytesToBytes = megabytes => megabytes * 1024 * 1024;

export const bytesToMegaBytes = bytes => bytes / 1024 / 1024;

export const rmdir = async dir => {
  const ls = (await fs.readdir(dir)) || [];
  for (const entry of ls) {
    const filename = path.resolve(dir, entry);
    const stat = await fs.stat(filename);

    if (stat.isDirectory()) {
      await rmdir(filename);
    } else if (!(filename === '.' || filename === '..')) {
      fs.unlinkSync(filename);
    }
  }

  return fs.rmdir(dir);
};

export const isEntryDirectory = entry => entry.fileName.endsWith('/');

export const removeFileExtension = originalZipName => {
  return originalZipName
    .split('.')
    .reverse()
    .pop();
};

export const extractZip = async (archive, basePath) => {
  const writeDirectory = async path => {
    return fs.mkdirp(path);
  };

  const writeFile = (readStream, location) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      const writeStream = await fs.createWriteStream(location);
      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        resolve();
      });
      writeStream.on('error', err => reject(err));
    });
  if (await fs.exists(basePath))
    throw exceptionWithHttpStatus('Verzeichnis existiert bereits.', 400);
  await fs.mkdirp(basePath);

  let entry;
  const processedFiles = [];
  while ((entry = await archive.readEntry())) {
    const entryLocationPath = path.resolve(basePath, entry.fileName);
    if (isEntryDirectory(entry)) {
      await writeDirectory(entryLocationPath);
    } else {
      await writeFile(await entry.openReadStream(), entryLocationPath);
    }

    processedFiles.push(entry.fileName);
  }

  return processedFiles;
};

export const getFileExtension = (fileName = '') =>
  fileName
    .split('.')
    .pop()
    .trim();

export const getPathSegments = path => path.split('/').filter(Boolean);
