import { Router } from 'express';
import multer from 'multer';
import getLogger from '../lib/get-logger';
import { getRequestHandler } from '../lib/utils';

import * as libraryService from '../service/library-service';

const library = Router(); // eslint-disable-line new-cap
const upload = multer({ storage: multer.memoryStorage() });
const logger = getLogger('library');
const handleRequest = getRequestHandler(logger);

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

library.post(
  '/upload',
  upload.single('file'),
  [],
  handleRequest(async (req, res) => {
    res.send(await libraryService.uploadZip(req.file));
  })
);

export default library;
