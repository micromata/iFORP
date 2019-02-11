import { bytesToMegaBytes } from './fs';

export const exceptionWithHttpStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const ensureZipFileValue = file => {
  if (!file) {
    throw exceptionWithHttpStatus('We need a file.', 400);
  }
};

export const ensureImageFilesValue = files => {
  if (!files || !files.length) {
    throw exceptionWithHttpStatus('We need a file.', 400);
  }
};

export const ensureZipFileSize = (file, maxFileSize) => {
  if (file.size > maxFileSize) {
    throw exceptionWithHttpStatus(
      `Maximum file size of ${bytesToMegaBytes(maxFileSize)} MB exceeded.`,
      413
    );
  }
};

export const ensureImageFileSizes = (files, maxFileSize) => {
  const filesAboveLimit = files.filter(file => file.size > maxFileSize);

  if (filesAboveLimit.length) {
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
