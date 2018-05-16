import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { Directory } from '../entity/Directory';
import { Project } from '../entity/Project';

import { getDummyProject } from './dummy-project';
import { getDummyDirectory } from './dummy-directory';

createConnection()
  .then(async connection => {
    console.log('Add dummy data …');

    // Inserting a new project
    const project = getDummyProject();

    // Save project
    await connection.getRepository(Project).save(project);
    console.log(`Saved a new project with id: ${project.id}\n`);

    // Loading projects from the database …
    const projects = await connection.getRepository(Project).find();
    console.log('Loaded projects:');
    console.dir(projects);

    console.log('Show last project:');
    console.log(JSON.stringify(projects.pop(), null, 2));

    // Inserting a new directory
    const directory = getDummyDirectory();

    // Save directory
    await connection.getRepository(Directory).save(directory);
    console.log(`Saved a new directory with id: ${directory.id}\n`);
  })
  .catch(error => console.log(error));
