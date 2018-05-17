import * as path from 'path';
import * as fs from 'fs-extra';
const Transform = require('stream').Transform;

export const unzip = (zipfile, uploadDir, res) => {
  console.log('Unzipping:');
  zipfile.readEntry();
  zipfile.once('end', () => {
    console.log('Done with unzipping.');
    res.send();
  });
  zipfile.on('entry', entry => {
    if (entry.fileName.endsWith('/')) {
      /**
       * Create directories
       */
      fs
        .mkdirp(`${uploadDir}/${entry.fileName}`)
        .then(() => {
          zipfile.readEntry();
        })
        .catch(error => {
          throw error;
        });
    } else {
      /**
       * Create files
       */
      fs.mkdirp(path.dirname(`${uploadDir}/${entry.fileName}`)).then(() => {
        zipfile.openReadStream(entry, function(err, readStream) {
          if (err) throw err;

          // Write file contents into file
          const writeStream = fs.createWriteStream(
            `${uploadDir}/${entry.fileName}`
          );
          readStream.pipe(writeStream);

          // Log progress
          console.log(`${uploadDir}/${entry.fileName}`);

          // Continue with next file
          zipfile.readEntry();
        });
      });
    }
  });
};
