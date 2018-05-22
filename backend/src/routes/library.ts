import * as path from 'path';
import { Router } from 'express';
import * as multer from 'multer';
import * as promisify from 'pify';
import * as yauzl from 'yauzl';

import { megaBytesToBytes, bytesToMegaBytes } from '../lib/utils';
import { unzip } from '../lib/unzip';

const fromBuffer = promisify(yauzl.fromBuffer);
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const maxFilesize = megaBytesToBytes(5);
const acceptedMimeTypes = ['application/zip'];
const uploadDir = path.join(__dirname, '../../../frontend/src/library');

router.get('/files', (req, res) => {
  // Get all library files
  res.send('Not implemented!');
});

router.get('/files/:fileId', (req, res) => {
  // Get library file by id
  res.send('Not implemented!');
});

router.post('/upload', upload.single('file'), [], (req, res) => {
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

    fromBuffer(req.file.buffer, { lazyEntries: true })
      .then(zipfile => unzip(zipfile, uploadDir))
      .then(successMessage => {
        res.send();
        console.log(successMessage);
      })
      .catch(error => {
        console.error(error);
      });
  }
});

export default router;
