import 'reflect-metadata';
import { createConnection } from 'typeorm';
import superb from 'superb';
import slugify from '@sindresorhus/slugify';

import { Directory } from '../entity/directory';
import { Project } from '../entity/project';

import { getDummyProject } from './dummy-project';
import { getDummyDirectory } from './dummy-directory';
import { dummyFileUpload } from './dummy-file-upload';

createConnection()
  .then(async connection => {
    console.log('Add dummy data …');

    const fakeUploadedDirName = slugify(`my ${superb()} directory`);

    // Dummy file upload
    const dummyFiles = await dummyFileUpload(fakeUploadedDirName);
    console.log(dummyFiles);

    // Save dummy project in the database
    const project = getDummyProject(fakeUploadedDirName);
    await connection.getRepository(Project).save(project);
    console.log(`Saved a new project with id: ${project.id}\n`);

    // Loading projects from the database …
    const projects = await connection.getRepository(Project).find();
    console.log('Loaded projects:');
    console.dir(projects);

    // console.log('Show last project:');
    // console.log(JSON.stringify(projects.pop(), null, 2));

    // Save dummy directory in the database
    const directory = getDummyDirectory(fakeUploadedDirName);
    await connection.getRepository(Directory).save(directory);
    console.log(`Saved a new directory with id: ${directory.id}\n`);
  })
  .catch(error => console.log(error));
