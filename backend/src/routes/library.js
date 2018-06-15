import multer from 'multer';
import { Router } from 'express';
import { getLogger } from '../lib/get-logger';
import { getRequestHandler } from '../utils/request';

import * as libraryService from '../service/library-service';

const library = Router(); // eslint-disable-line new-cap
const upload = multer({ storage: multer.memoryStorage() });
const logger = getLogger('library');
const handleRequest = getRequestHandler(logger);

library.get(
  '/files',
  handleRequest(async (_, res) => {
    const result = await libraryService.getStrippedDirectories();
    res.send(result);
  })
);

library.get(
  '/asset/:id',
  handleRequest(async (req, res) => {
    const asset = await libraryService.getAsset(req.params.id);
    if (asset.type === 'css') {
      res.set('Content-Type', 'text/css');
    } else {
      res.set('Content-Type', 'application/javascript');
    }
    res.sendFile(asset.location);
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
    res.send(await libraryService.uploadZip(req.file, req.body.directoryName));
  })
);

export default library;
