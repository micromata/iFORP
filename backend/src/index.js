import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';
import getConnectionOptions from './get-connection-options';

createConnection(getConnectionOptions())
  .then(() => {
    app.listen(3000, () =>
      console.log('Backend started on http://localhost:3000!')
    );
  })
  .catch(error => console.error(error));
