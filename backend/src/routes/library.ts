import {Router} from "express";

const router = Router();

router.get('/files', (req, res) => {
  // Get all library files
  res.send('Not implemented!');
});

router.get('/files/:fileId', (req, res) => {
  // Get library file by id
  res.send('Not implemented!');
});

router.post('/library/upload', (req, res) => {
  // Save ZIP to library
  res.send('Not implemented!');
});

export default router;
