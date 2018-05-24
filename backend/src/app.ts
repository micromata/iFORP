import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import libraryEndpoint from './routes/library';
import projectsEndpoint from './routes/projects';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/library', libraryEndpoint);
app.use('/projects', projectsEndpoint);

app.get('/', (_, res) => res.send('Hello Worldzzzzzzzz!'));

export default app;
