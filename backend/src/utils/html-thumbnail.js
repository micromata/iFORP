import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs-extra';
import imgBase64 from 'base64-img';

const getParentDirPath = directory => {
  const segments = directory.split(path.sep);
  segments.pop();
  return segments.join(path.sep);
};

const buildStyle = (page, directory) => {
  const cssDir = getParentDirPath(directory);
  return page.assets
    .filter(asset => asset.type === 'css')
    .map(asset =>
      fs.readFileSync(path.resolve(cssDir, asset.location)).toString()
    )
    .join(' ');
};

const replaceImageSources = (page, directory) => {
  const $ = cheerio.load(page.body);
  const imgDir = getParentDirPath(directory);

  page.assets
    .filter(asset => asset.type === 'img')
    .forEach(asset => {
      const selector = `img[data-image-id="${asset.imageId}"]`;
      const imgPath = path.resolve(imgDir, asset.location);
      const base64Data = imgBase64.base64Sync(imgPath);
      $(selector).attr('src', base64Data);
    });

  return $.html();
};

const buildHtmlForPage = (page, directory) => {
  const attributes = Object.keys(page.htmlElementAttributes)
    .map(attrName => `${attrName}='${page.htmlElementAttributes[attrName]}'`)
    .join(' ');

  const style = buildStyle(page, directory);
  const body = replaceImageSources(page, directory);

  const wholePageMarkup = `
    <html ${attributes}>
      <head>
        ${page.head}
      </head>
      <body>
        <style>
          ${style}
        </style>
        ${body}
      </body>
    </html>
  `;

  return wholePageMarkup;
};

export const createThumbnailFromPage = async (page, directory) => {
  const thumbnailName = `thumbnail-${page.name}.png`;
  const thumbnailPath = path.resolve(directory, thumbnailName);
  const html = buildHtmlForPage(page, directory);
  const browser = await puppeteer.launch();
  const site = await browser.newPage();
  await site.setContent(html);
  await site.setViewport({ width: 600, height: 600 });
  await site.screenshot({ path: thumbnailPath });
};
