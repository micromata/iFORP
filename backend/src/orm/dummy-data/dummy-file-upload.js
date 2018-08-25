import fs from 'fs-extra';
import path from 'path';

export async function dummyFileUpload(fakeUploadedDirName) {
  const uploadDir = path.join(__dirname, '../../../../frontend/src/library');
  const newDirectoryName = path.join(uploadDir, fakeUploadedDirName);
  const cssFile = path.join(newDirectoryName, 'assets/css/app.bundle.css');
  const jsFile = path.join(newDirectoryName, 'app/app.bundle.js');

  return new Promise((resolve, reject) => {
    fs.mkdirp(newDirectoryName)
      .then(() => fs.createFile(cssFile))
      .then(() => fs.writeFile(cssFile, 'body { background: pink; }', 'utf8'))
      .then(() => fs.createFile(jsFile))
      .then(() => fs.writeFile(jsFile, 'console.log("Yeah");', 'utf8'))
      .then(() => resolve('Done with filesystem stuff.'))
      .catch(reason => reject(new Error(reason)));
  });
}
