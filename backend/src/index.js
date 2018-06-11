import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';
import getConnectionOptions from './get-connection-options';
import getLogger from './lib/get-logger';

const logger = getLogger();

createConnection(getConnectionOptions())
  .then(() => {
    app.listen(3000, () =>
      logger.success('Backend started on http://localhost:3000!')
    );
  })
  .catch(error => logger.fatal(error));
