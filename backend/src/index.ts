import 'reflect-metadata'; // tslint:disable-line
import app from './app';
import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    app.listen(3000, () =>
      console.log('Backend started on http://localhost:3000!')
    );
  })
  .catch(error => console.error(error));
