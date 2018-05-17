import * as path from 'path';
import { Router } from 'express';
import * as multer from 'multer';
import * as fs from 'fs-extra';
import * as promisify from 'pify';
import * as yauzl from 'yauzl';
import * as stream from 'stream';
const Transform = require('stream').Transform;

import { megaBytesToBytes, bytesToMegaBytes } from '../lib/utils';

const fromBuffer = promisify(yauzl.fromBuffer);
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const maxFilesize = megaBytesToBytes(5);
const acceptedMimeTypes = ['application/zip'];
const uploadDir = path.join(__dirname, '../../../frontend/src/library');

function mkdirp(dir, cb) {
  if (dir === '.') return cb();
  fs.stat(dir, function(err) {
    if (err == null) return cb(); // already exists

    var parent = path.dirname(dir);
    mkdirp(parent, function() {
      process.stdout.write(dir.replace(/\/$/, '') + '/\n');
      fs.mkdir(dir, cb);
    });
  });
}

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
    fromBuffer(req.file.buffer, { lazyEntries: true })
      .then(zipfile => {
        // track when we've closed all our file handles
        var handleCount = 0;
        function incrementHandleCount() {
          handleCount++;
        }
        function decrementHandleCount() {
          handleCount--;
          if (handleCount === 0) {
            console.log('all input and output handles closed');
          }
        }

        incrementHandleCount();
        zipfile.once('end', function() {
          console.log('End of buffer');
          decrementHandleCount();
          res.send();
        });

        zipfile.readEntry();
        zipfile.on('entry', function(entry) {
          if (/\/$/.test(`${uploadDir}/${entry.fileName}`)) {
            // directory file names end with '/'

            mkdirp(`${uploadDir}/${entry.fileName}`, function(err) {
              if (err) throw err;
              zipfile.readEntry();
            });
          } else {
            // ensure parent directory exists
            mkdirp(path.dirname(`${uploadDir}/${entry.fileName}`), function() {
              zipfile.openReadStream(entry, function(err, readStream) {
                if (err) throw err;
                // report progress through large files
                var byteCount = 0;
                var totalBytes = entry.uncompressedSize;
                var lastReportedString = byteCount + '/' + totalBytes + '  0%';
                process.stdout.write(
                  `${uploadDir}/${entry.fileName}` + '...' + lastReportedString
                );
                function reportString(msg) {
                  var clearString = '';
                  for (var i = 0; i < lastReportedString.length; i++) {
                    clearString += '\b';
                    if (i >= msg.length) {
                      clearString += ' \b';
                    }
                  }
                  process.stdout.write(clearString + msg);
                  lastReportedString = msg;
                }
                // report progress at 60Hz
                var progressInterval = setInterval(function() {
                  reportString(
                    byteCount +
                      '/' +
                      totalBytes +
                      '  ' +
                      ((byteCount / totalBytes * 100) | 0) +
                      '%'
                  );
                }, 1000 / 60);
                var filter = new Transform();
                filter._transform = function(chunk, encoding, cb) {
                  byteCount += chunk.length;
                  cb(null, chunk);
                };
                filter._flush = function(cb) {
                  clearInterval(progressInterval);
                  reportString('');
                  // delete the "..."
                  process.stdout.write('\b \b\b \b\b \b\n');
                  cb();
                  zipfile.readEntry();
                };

                // pump file contents
                console.log('pump file contents');
                var writeStream = fs.createWriteStream(
                  `${uploadDir}/${entry.fileName}`
                );
                incrementHandleCount();
                writeStream.on('close', decrementHandleCount);
                readStream.pipe(filter).pipe(writeStream);
              });
            });
          }
        });
      })
      .catch(error => {
        console.error(error);
      });

    // fs
    //   .writeFile(`${uploadDir}/${req.file.originalname}`, req.file.buffer)
    //   .then(() => {
    //     res.send();
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     res.status(500).send('Oops …');
    //   });
  }
});

export default router;
