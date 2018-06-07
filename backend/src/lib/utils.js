export const megaBytesToBytes = megabytes => megabytes * 1024 * 1024;

export const bytesToMegaBytes = bytes => bytes / 1024 / 1024;

export const exceptionWithHttpStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const handleRequest = handler => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (exception) {
      console.error(exception);
      res.sendStatus(exception.statusCode || 500);
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
