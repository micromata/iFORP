import path from 'path';
import fs from 'fs-extra';

export const unzip = async (zipFile, uploadDir) => {
  console.log('Unzipping:');
  let directoryName;

  return new Promise((resolve, reject) => {
    zipFile.readEntry();
    zipFile.once('end', () =>
      resolve({
        message: 'Done with unzipping.',
        directoryName: directoryName.substring(0, directoryName.length - 1)
      })
    );
    zipFile.on('entry', entry => {
      directoryName = directoryName ? directoryName : entry.fileName;
      if (entry.fileName.endsWith('/')) {
        /**
         * Create directories
         */
        fs
          .mkdirp(`${uploadDir}/${entry.fileName}`)
          .then(() => {
            zipFile.readEntry();
          })
          .catch(error => {
            reject(error);
          });
      } else {
        /**
         * Create files
         */
        fs.mkdirp(path.dirname(`${uploadDir}/${entry.fileName}`)).then(() => {
          zipFile.openReadStream(entry, (error, readStream) => {
            if (error) {
              reject(error);
            }

            // Write file contents into file
            const writeStream = fs.createWriteStream(
              `${uploadDir}/${entry.fileName}`
            );
            readStream.pipe(writeStream);

            // Log progress
            console.log(`${uploadDir}/${entry.fileName}`);

            // Continue with next file
            zipFile.readEntry();
          });
        });
      }
    });
  });
};
