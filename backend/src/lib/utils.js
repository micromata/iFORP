import fs from 'fs-extra';
import path from 'path';

export const megaBytesToBytes = megabytes => megabytes * 1024 * 1024;

export const bytesToMegaBytes = bytes => bytes / 1024 / 1024;

export const exceptionWithHttpStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const ensureFile = file => {
  if (!file) {
    throw exceptionWithHttpStatus('We need a file.', 400);
  }
};

export const ensureFileSize = (file, maxFileSize) => {
  if (file.size > maxFileSize) {
    throw exceptionWithHttpStatus(
      `Maximum file size of ${bytesToMegaBytes(maxFileSize)} MB exceeded.`,
      413
    );
  }
};

export const ensureMimeType = (file, acceptedMimes) => {
  if (!acceptedMimes.includes(file.mimetype)) {
    throw exceptionWithHttpStatus(`Wrong file type.`, 406);
  }
};

export const isEntryDirectory = entry => entry.fileName.endsWith('/');

export const removeFileExtension = originalZipName => {
  return originalZipName
    .split('.')
    .reverse()
    .pop();
};

export const getRequestHandler = logger => handler => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (exception) {
      logger.error(exception);
      res.status(exception.statusCode || 500);
      res.send(exception.message);
    }
  };
};

export const htmlElementAttributeTransformer = () => ({
  to(value = {}) {
    return Object.keys(value)
      .reduce((acc, cur) => [...acc, `${cur}=${value[cur]}`], [])
      .join(';');
  },
  from(value = '') {
    return value.split(';').reduce((acc, cur) => {
      const [key, val] = cur.split('=');
      return { ...acc, [key]: val };
    }, {});
  }
});

export const deepMerge = (target = {}, ...others) => {
  return others.reduce((acc, other) => {
    Object.keys(other).forEach(property => {
      if (typeof other[property] === 'object')
        Object.assign(
          other[property],
          deepMerge(target[property], other[property])
        );
    });
    Object.assign(target, other);
    return target;
  }, target);
};

export const extractZip = async (archive, basePath) => {
  const writeDirectory = async path => {
    return fs.mkdirp(path);
  };

  const writeFile = (readStream, location) =>
    new Promise(async (resolve, reject) => {
      const writeStream = await fs.createWriteStream(location);
      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        resolve();
      });
      writeStream.on('error', err => reject(err));
    });
  if (await fs.exists(basePath))
    throw exceptionWithHttpStatus('Folder already exists.', 400);
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
