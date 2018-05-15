import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import libraryEndpoint from './routes/library';
import projectsEndpoint from './routes/projects';
import { createConnection } from 'typeorm';

(async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/library', libraryEndpoint);
  app.use('/projects', projectsEndpoint);

  app.get('/', (req, res) => res.send('Hello Worldzzzzzzzz!'));

  const db = await createConnection();

  app.listen(3000, () =>
    console.log('Example app listening on http://localhost:3000!')
  );

  console.log('App started!!!!!!!');
})();
