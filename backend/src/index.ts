import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';

(async () => {
  const db = await createConnection();

  app.listen(3000, () =>
    console.log('Backend started on http://localhost:3000!')
  );
})();
