import * as path from 'path';
import * as fs from 'fs-extra';
const Transform = require('stream').Transform;

export const unzip = (zipfile, uploadDir) => {
  console.log('Unzipping:');
  let directoryName: string;

  return new Promise(function(resolve, reject) {
    zipfile.readEntry();
    zipfile.once('end', () =>
      resolve({
        message: 'Done with unzipping.',
        directoryName: directoryName.substring(0, directoryName.length - 1)
      })
    );
    zipfile.on('entry', entry => {
      directoryName = !directoryName ? entry.fileName : directoryName;
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
            reject(error);
          });
      } else {
        /**
         * Create files
         */
        fs.mkdirp(path.dirname(`${uploadDir}/${entry.fileName}`)).then(() => {
          zipfile.openReadStream(entry, function(error, readStream) {
            if (error) reject(error);

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
  });
};
