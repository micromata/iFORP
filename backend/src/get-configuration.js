import fs from 'fs';
import os from 'os';
import path from 'path';
import { deepMerge } from './utils/lang';
import { getLogger } from './lib/get-logger';

const logger = getLogger('config');

const defaults = {
  configurationPath: path.resolve(os.homedir(), '.iforp/iforprc.json'),
  upload: {
    directory: path.resolve(os.homedir(), '.iforp/library/'),
    maxFileSize: 5 * 1024 * 1024,
    acceptedMimesZip: ['application/zip'],
    acceptedMimesImage: ['image/jpeg', 'image/png']
  }
};

const test = {
  upload: {
    directory: path.resolve(os.tmpdir(), '.iforp/library/'),
    maxFileSize: 5 * 1024 * 1024,
    acceptedMimesZip: ['application/zip'],
    acceptedMimesImage: ['image/jpeg', 'image/png']
  }
};

const getUserConfiguration = () => {
  try {
    const configFile = fs.readFileSync(defaults.configurationPath, 'utf8');
    return JSON.parse(configFile);
  } catch (error) {
    if (!error.code === 'ENOENT') {
      logger.error(error);
    }
    return {};
  }
};

export const getConfiguration = () => {
  if (process.env.NODE_ENV === 'test') {
    return test;
  }
  return deepMerge(defaults, getUserConfiguration());
};
