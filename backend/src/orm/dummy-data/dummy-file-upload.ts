import * as fs from 'fs-extra';
import * as path from 'path';
import * as superb from 'superb';
import * as slugify from '@sindresorhus/slugify';

const uploadDir = path.join(__dirname, '../../../../frontend/src/library');
const NewDirectoryName = path.join(
  uploadDir,
  slugify(`my ${superb()} directory`)
);
const cssFile = path.join(NewDirectoryName, 'assets/css/app.bundle.css');
const jsFile = path.join(NewDirectoryName, 'app/app.bundle.js');

console.log(uploadDir);

export function dummyFileUpload() {
  return new Promise((resolve, reject) => {
    fs
      .mkdirp(NewDirectoryName)
      .then(() => fs.createFile(cssFile))
      .then(() => fs.writeFile(cssFile, 'body { background: pink; }', 'utf8'))
      .then(() => fs.createFile(jsFile))
      .then(() => fs.writeFile(jsFile, 'console.log("Yeah");', 'utf8'))
      .then(() => resolve('Done with filesystem stuff.'))
      .catch(reason => reject(new Error(reason)));
  });
}
