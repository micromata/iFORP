import 'reflect-metadata';
import {createConnection} from 'typeorm';

// Why the fuck cant I import it via ES6 module syntax
const superb = require('superb');


import {Project} from './entity/Project';

createConnection().then(async connection => {


  // Inserting a new project into the database
  const project = new Project();
  project.name = `My ${superb()} project`;

  await connection.manager.save(project);
  console.log(`Saved a new project with id: ${project.id}\n`);

  // Loading projects from the database …
  const projects = await connection.manager.find(Project);
  console.log('Loaded projects:');
  console.dir(projects);

}).catch(error => console.log(error));
