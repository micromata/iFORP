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
import { Image } from '../orm/entity/image';
import { getConfiguration } from '../get-configuration';
import {
  ensureZipFileSize,
  ensureMimeType,
  ensureZipFileValue,
  ensureImageFilesValue,
  ensureImageFileSizes,
  exceptionWithHttpStatus
} from '../utils/request';
import getImageDimensions from 'buffer-image-size';
import { createThumbnailFromPage } from '../utils/html-thumbnail';

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
  ensureZipFileValue(file);
  ensureZipFileSize(file, uploadOptions.maxFileSize);
  ensureMimeType(file, uploadOptions.acceptedMimesZip);

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
      'Sie müssen eine .zip-Datei mit HTML-Dateien hochladen.',
      422 // unprocessable entity
    );
  }

  const directory = new Directory();
  directory.name = getPathSegments(extractionBasePath).pop();
  directory.pages = htmlFiles.map(file =>
    processHtmlFile(
      file,
      uploadOptions.directory,
      extractionBasePath,
      directory.name
    )
  );

  const screenshotTasks = directory.pages.map(page =>
    createThumbnailFromPage(page, extractionBasePath, directory)
  );

  await Promise.all(screenshotTasks);

  const saved = await getRepository(Directory).save(directory);
  logger.info('Saved the directory to the database.');
  return saved;
};

const getImagePath = (imagesDirPath, fileName, extension, ranTimes = 0) => {
  const filePathToCheck = path.resolve(
    imagesDirPath,
    ranTimes ? `${fileName}-${ranTimes}${extension}` : `${fileName}${extension}`
  );
  if (fs.existsSync(filePathToCheck)) {
    return getImagePath(imagesDirPath, fileName, extension, ranTimes + 1);
  }
  return filePathToCheck;
};

const ensureDirectoryExists = path => {
  if (fs.existsSync(path)) return;
  fs.mkdirSync(path);
};

export const uploadImages = async files => {
  ensureImageFilesValue(files);
  ensureImageFileSizes(files, uploadOptions.maxFileSize);
  files.forEach(file => ensureMimeType(file, uploadOptions.acceptedMimesImage));
  logger.info(`Images upload`);

  const imagesDirPath = path.resolve(uploadOptions.directory, 'images');
  ensureDirectoryExists(uploadOptions.directory);
  ensureDirectoryExists(imagesDirPath);

  const directoryRepository = getRepository(Directory);
  const foundDirectoriesWithName = await directoryRepository.find({
    name: 'images'
  });
  const directory = foundDirectoriesWithName[0] || new Directory();
  directory.name = 'images';
  directory.images = directory.images || [];

  files.forEach(file => {
    logger.info(`Processing image "${file.originalname}"`);

    const extname = path.extname(file.originalname);
    const filename = path.basename(file.originalname, extname);
    const imageFilePath = getImagePath(imagesDirPath, filename, extname);
    const dimensions = getImageDimensions(file.buffer);
    const image = new Image();
    image.name = path.basename(imageFilePath);
    image.width = dimensions.width;
    image.height = dimensions.height;
    directory.images.push(image);
    logger.info(
      `... image "${image.name}" (${image.width}x${
        image.height
      }) added to directory entity`
    );

    fs.writeFileSync(imageFilePath, file.buffer);
    logger.info(
      `... image "${image.name}" (${image.width}x${
        image.height
      }) written to disk`
    );
  });

  const saved = await directoryRepository.save(directory);
  logger.info('Saved directory with new images to database.');
  return saved;
};

export const getStrippedDirectories = async () => {
  return (await getRepository(Directory).find()).map(directory => ({
    ...directory
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
