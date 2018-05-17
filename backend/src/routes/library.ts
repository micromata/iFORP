import * as path from 'path';
import { Router } from 'express';
import * as multer from 'multer';
import * as fs from 'fs-extra';

import { megaBytesToBytes, bytesToMegaBytes } from '../lib/utils';

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
    // TODO: Unarchive file
    fs
      .writeFile(`${uploadDir}/${req.file.originalname}`, req.file.buffer)
      .then(() => {
        res.send();
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Oops …');
      });
  }
});

export default router;
