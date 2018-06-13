import fs from 'fs';
import os from 'os';
import path from 'path';
import { deepMerge } from './lib/utils';
import { getLogger } from './lib/get-logger';

const logger = getLogger('config');

const defaults = {
  configurationPath: path.resolve(os.homedir(), '.iforp/iforprc.json'),
  upload: {
    directory: path.resolve(os.homedir(), '.iforp/library/'),
    maxFileSize: 5 * 1024 * 1024,
    acceptedMimes: ['application/zip']
  }
};

const getUserConfiguration = () => {
  try {
    const configFile = fs.readFileSync(defaults.configurationPath, 'utf8');
    return JSON.parse(configFile);
  } catch (error) {
    if (error.code === 'ENOENT') {
      logger.info('No user configuration given. Using defaults.');
    } else {
      logger.error(error);
    }
    return {};
  }
};

export const getConfiguration = () => {
  return deepMerge(defaults, getUserConfiguration());
};
