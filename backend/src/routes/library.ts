import * as path from 'path';
import { Router } from 'express';
import * as multer from 'multer';
import * as promisify from 'pify';
import * as yauzl from 'yauzl';
import * as fs from 'fs-extra';
import {
  extractDocumentBody,
  extractDocumentHead,
  extractScriptAssets,
  extractStyleAssets
} from '../markup-util';
import { getRepository } from 'typeorm';

import * as libraryService from '../service/library-service';

import { Directory } from '../orm/entity/Directory';
import { Page } from '../orm/entity/Page';

import { bytesToMegaBytes, megaBytesToBytes } from '../lib/utils';
import { unzip } from '../lib/unzip';

const library = Router(); // eslint-disable-line new-cap
const upload = multer({ storage: multer.memoryStorage() });

library.get('/files', async (_, res) => {
  // Get all directories with pages
  res.send(await libraryService.getStrippedDirectories());
});

library.get('/files/:fileId', async (req, res) => {
  // Get one page
  res.send(await libraryService.getPage(req.params.fileId));
});

library.post('/upload', upload.single('file'), [], (req, res) => {
  const readZipFileFromBuffer = promisify(yauzl.fromBuffer);
  const maxFilesize = megaBytesToBytes(5);
  const acceptedMimeTypes = ['application/zip'];
  const uploadDir = path.join(__dirname, '../../../frontend/src/library');
  const repo = getRepository(Directory);

  /**
   * TODO: Handle case that one uploads zipped files and folders instead of a zipped folder.
   * eg. the content of a `dist` directory instead of the dist directorx itself
   */

  /**
   * TODO: Handle case that one uploads a directory with a name that already exists
   * (in the database and file system)
   * Right now it:
   * - adds a new entry into the database
   * - Overwrites the content in the file system
   */

  if (!req.file) {
    res.status(400).send('We need a file.');
    return false;
  }
  if (req.file.size > maxFilesize) {
    res
      .status(413)
      .send(
        `Maximum filesize of ${bytesToMegaBytes(maxFilesize)} MB exceeded.`
      );
    return false;
  }
  if (!acceptedMimeTypes.includes(req.file.mimetype)) {
    res.status(406).send(`Wrong file type.`);
    return false;
  }
  console.log('Uploaded: ', req.file);

  readZipFileFromBuffer(req.file.buffer, { lazyEntries: true })
    .then(async zipfile => unzip(zipfile, uploadDir))
    .then(async result => {
      console.log(result.message);
      // Save dummy directory in the database
      const directory = new Directory();
      const { directoryName } = result;
      directory.name = directoryName;
      directory.pages = [];

      const basePath = path.resolve(uploadDir, directoryName);
      const files = ((await fs.readdir(basePath)) || []).filter(file => {
        const f = file || '';
        return (
          f
            .split('.')
            .pop()
            .trim() === 'html'
        );
      });

      files.forEach(file => {
        const fileContents = fs
          .readFileSync(path.resolve(basePath, file))
          .toString();
        const name = file;
        const body = extractDocumentBody(fileContents);
        const head = extractDocumentHead(fileContents);
        // Const htmlElementAttributes TODO: implement in markup util
        const css = extractStyleAssets(fileContents);
        const js = extractScriptAssets(fileContents);
        directory.pages.push({ name, body, head, css, js } as Page);
      });

      await repo.save(directory);
      console.log('Saved the directory to the database.');

      // Send 200 status code
      res.send();
    })
    .catch(error => {
      console.error(error);
    });
});

export default library;
