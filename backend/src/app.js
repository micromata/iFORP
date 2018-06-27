import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import libraryEndpoint from './routes/library';
import projectsEndpoint from './routes/projects';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/library', libraryEndpoint);
app.use('/projects', projectsEndpoint);

// TODO Serve built frontend
app.use(express.static(path.join(__dirname, '/public')));

export default app;
