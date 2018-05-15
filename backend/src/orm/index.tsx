import 'reflect-metadata';
import * as express from 'express';

import libraryEndpoint from '../routes/library';
import projectsEndpoint from '../routes/projects';

const app = express();
app.use('/library', libraryEndpoint);
app.use('/projects', projectsEndpoint);

app.get('/', (req, res) => res.send('Hello Worldzzzzzzzz!'));

app.listen(3000, () =>
  console.log('Example app listening on http://localhost:3000!')
);

console.log('App started!!!!!!!');
