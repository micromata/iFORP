import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { Directory } from '../entity/Directory';
import { Project } from '../entity/Project';

import { getDummyProject } from './dummy-project';
import { getDummyDirectory } from './dummy-directory';
import { dummyFileUpload } from './dummy-file-upload';

createConnection()
  .then(async connection => {
    console.log('Add dummy data …');

    // Dummy file upload
    const dummyFiles = await dummyFileUpload();
    console.log(dummyFiles);

    // Save dummy project in the database
    const project = getDummyProject();
    await connection.getRepository(Project).save(project);
    console.log(`Saved a new project with id: ${project.id}\n`);

    // Loading projects from the database …
    const projects = await connection.getRepository(Project).find();
    console.log('Loaded projects:');
    console.dir(projects);

    // console.log('Show last project:');
    // console.log(JSON.stringify(projects.pop(), null, 2));

    // Save dummy directory in the database
    const directory = getDummyDirectory();
    await connection.getRepository(Directory).save(directory);
    console.log(`Saved a new directory with id: ${directory.id}\n`);
  })
  .catch(error => console.log(error));
