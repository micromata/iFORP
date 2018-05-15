const express = require('express');
const app = express();

const libraryEndpoint = require('./routes/library');
const projectsEndpoint = require('./routes/projects');

app.use('/library', libraryEndpoint);
app.use('/projects', projectsEndpoint);

app.get('/', (req, res) => res.send('Hello Worldzzzzzzzz!'));

app.listen(3000, () => console.log('Example app listening on http://localhost:3000!'));
