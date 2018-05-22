import * as path from 'path';
import { Router } from 'express';
import * as multer from 'multer';
import * as promisify from 'pify';
import * as yauzl from 'yauzl';
import { getRepository } from 'typeorm';

import { Directory } from '../orm/entity/Directory';
import { PageAsset } from '../orm/entity/Asset';
import { Page } from '../orm/entity/Page';

import { megaBytesToBytes, bytesToMegaBytes } from '../lib/utils';
import { unzip } from '../lib/unzip';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/files', (req, res) => {
  // Get all library files
  res.send('Not implemented!');
});

router.get('/files/:fileId', (req, res) => {
  // Get library file by id
  res.send('Not implemented!');
});

router.post('/upload', upload.single('file'), [], (req, res) => {
  const ReadZipFileFromBuffer = promisify(yauzl.fromBuffer);
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
   */

  if (!req.file) {
    res.status(400).send('We need a file.');
  }
  if (req.file.size > maxFilesize) {
    res
      .status(413)
      .send(
        `Maximum filesize of ${bytesToMegaBytes(maxFilesize)} MB exceeded.`
      );
  }
  if (!acceptedMimeTypes.includes(req.file.mimetype)) {
    res.status(406).send(`Wrong file type.`);
  }

  if (req.file) {
    console.log('Uploaded: ', req.file);

    ReadZipFileFromBuffer(req.file.buffer, { lazyEntries: true })
      .then(zipfile => unzip(zipfile, uploadDir))
      .then(result => {
        console.log(result.message);

        // Save dummy directory in the database
        const directory = new Directory();
        const directoryName = result.directoryName;
        directory.name = directoryName;
        directory.pages = [];

        // TODO: Need to get the pages stuff from the filesystem
        // Need to do something like this in a loop
        const page = new Page();
        page.name = `Name from filesystem`;
        page.body = '<p>Paragraph</p>';
        page.head = '<meta charset="utf-8"><title>Title</title>';
        page.htmlElementAttributes = 'lang:en';
        page.css = [];

        const cssAsset = new PageAsset();
        cssAsset.type = 'css';
        cssAsset.location = `../library/${directoryName}/assets/css/filename`;

        page.css.push(cssAsset);
        directory.pages.push(page);

        repo.save(directory);
        console.log('Saved the directory to the database.');

        // Send 200 status code
        res.send();
      })
      .catch(error => {
        console.error(error);
      });
  }
});

export default router;
