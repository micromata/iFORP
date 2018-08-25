import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';
import getConnectionOptions from './get-connection-options';
import { getLogger } from './lib/get-logger';
import { getConfiguration } from './get-configuration';
import { rmdir } from './utils/fs';

const logger = getLogger();

const configuration = getConfiguration();
const args = process.argv.slice(2);

// parse command line args
args.forEach(async arg => {
  if (arg.toLowerCase().indexOf('clean') !== -1) {
    await rmdir(configuration.upload.directory);
  }
});

createConnection(getConnectionOptions())
  .then(() => {
    app.listen(3001, () =>
      logger.success('Backend started on http://localhost:3000!')
    );
  })
  .catch(error => logger.fatal(error));
