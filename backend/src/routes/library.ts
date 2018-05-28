import * as path from 'path';
import { Router } from 'express';
import * as multer from 'multer';
import * as promisify from 'pify';
import * as yauzl from 'yauzl';
import * as fs from 'fs-extra';
import {
  extractDocumentBody,
  extractDocumentHead,
  extractHtmlElementAttributes,
  extractScriptAssets,
  extractStyleAssets
} from '../markup-util';
import { getRepository } from 'typeorm';

import * as libraryService from '../service/library-service';

import { Directory } from '../orm/entity/Directory';
import { Page } from '../orm/entity/Page';

import {
  bytesToMegaBytes,
  handleRequest,
  megaBytesToBytes
} from '../lib/utils';
import { unzip } from '../lib/unzip';

const library = Router(); // eslint-disable-line new-cap
const upload = multer({ storage: multer.memoryStorage() });

// TODO: Send HTTP Status code 400 when trying to get data by IDs which don’t exist
// Issue: PROFI-38
library.get(
  '/files',
  handleRequest(async (_, res) => {
    const result = await libraryService.getStrippedDirectories();
    res.send(result);
  })
);

library.get(
  '/files/:fileId',
  handleRequest(async (req, res) => {
    const result = await libraryService.getPage(req.params.fileId);
    res.send(result);
  })
);

library.post('/upload', upload.single('file'), [], (req, res) => {
  const readZipFileFromBuffer = promisify(yauzl.fromBuffer);
  const maxFilesize = megaBytesToBytes(5);
  const acceptedMimeTypes = ['application/zip'];
  const uploadDirName = 'library';
  const uploadDir = path.join(
    __dirname,
    `../../../frontend/src/${uploadDirName}`
  );
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
   * Issue: PROFI-33
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
    .then(async zipFile => unzip(zipFile, uploadDir))
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
        const css = extractStyleAssets(
          fileContents,
          `../${uploadDirName}/${directoryName}`
        );
        const js = extractScriptAssets(
          fileContents,
          `../${uploadDirName}/${directoryName}`
        );
        const htmlElementAttributes = extractHtmlElementAttributes(
          fileContents
        );
        directory.pages.push({
          name,
          body,
          head,
          assets: [...css, ...js],
          htmlElementAttributes
        } as Page);
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
