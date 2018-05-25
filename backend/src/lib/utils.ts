export const megaBytesToBytes = (megabytes: number) => megabytes * 1024 * 1024;

export const bytesToMegaBytes = (bytes: number) => bytes / 1024 / 1024;

export const exceptionWithHttpStatus = (message, statusCode) => {
  const error: Error | any = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const handleRequest = handler => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (exception) {
      console.error(exception.message);
      res.sendStatus(exception.statusCode || 500);
    }
  };
};
