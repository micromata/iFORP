import 'reflect-metadata';
import { createConnection } from 'typeorm';
import superb from 'superb';
import slugify from '@sindresorhus/slugify';

import { Directory } from '../entity/directory';
import { Project } from '../entity/project';

import { getDummyProject } from './dummy-project';
import { getDummyDirectory } from './dummy-directory';
import { dummyFileUpload } from './dummy-file-upload';

import getLogger from '../../lib/get-logger';
import getConnectionOptions from '../../get-connection-options';

const logger = getLogger('dummy data');

createConnection(getConnectionOptions())
  .then(async connection => {
    logger.info('Add dummy data …');

    const fakeUploadedDirName = slugify(`my ${superb()} directory`);

    // Dummy file upload
    const dummyFiles = await dummyFileUpload(fakeUploadedDirName);
    logger.info(dummyFiles);

    // Save dummy project in the database
    const project = getDummyProject(fakeUploadedDirName);
    await connection.getRepository(Project).save(project);
    logger.info(`Saved a new project with id: ${project.id}\n`);

    // Loading projects from the database …
    const projects = await connection.getRepository(Project).find();
    logger.info('Loaded projects:');
    logger.info(projects);

    // logger.info('Show last project:');
    // logger.info(JSON.stringify(projects.pop(), null, 2));

    // Save dummy directory in the database
    const directory = getDummyDirectory(fakeUploadedDirName);
    await connection.getRepository(Directory).save(directory);
    logger.info(`Saved a new directory with id: ${directory.id}\n`);
  })
  .catch(error => logger.error(error));
