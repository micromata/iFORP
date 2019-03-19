import cheerio from 'cheerio';
import path from 'path';
import { Asset } from '../orm/entity/asset';
import fs from 'fs-extra';
import uuid from 'uuid/v4';

export function extractScriptAssets(markup, relPath) {
  const $ = cheerio.load(markup);
  const scripts = $('script');
  return scripts.toArray().map(el => {
    const asset = mapElementToAsset(el, relPath);
    asset.type = 'js';
    return asset;
  });
}

export function extractStyleAssets(markup, relPath) {
  const $ = cheerio.load(markup);
  const inlineStyles = $('style');
  const linkedStyles = $('link[rel="stylesheet"]');
  return [...inlineStyles.toArray(), ...linkedStyles.toArray()].map(el => {
    const asset = mapElementToAsset(el, relPath);
    asset.type = 'css';
    return asset;
  });
}

export function extractImageAssets(markup, relPath) {
  const $ = cheerio.load(markup);
  const images = $('img[data-image-id]').toArray();
  return images.map(img => {
    const imageId = $(img).attr('data-image-id');
    const asset = mapElementToAsset(img, relPath);
    asset.imageId = imageId;
    asset.type = 'img';
    return asset;
  });
}

function removeAssetsFromDocument($) {
  $('link[rel="stylesheet"]').remove();
  $('style').remove();
  $('script').remove();
}

export function extractHtmlElementAttributes(markup) {
  const $ = cheerio.load(markup);
  return $('html').get(0).attribs;
}

export function extractDocumentHead(markup) {
  const $ = cheerio.load(markup);
  removeAssetsFromDocument($);
  return $('head')
    .html()
    .trim();
}

export function extractDocumentBody(markup) {
  const $ = cheerio.load(markup);
  removeAssetsFromDocument($);
  return $('body')
    .html()
    .trim();
}

function mapElementToAsset(el, relPath) {
  const asset = new Asset();
  const assetSrc = el.attribs.src || el.attribs.href;
  if (assetSrc) {
    asset.location = path.join(relPath, assetSrc);
  } else {
    asset.contents = el.firstChild.nodeValue.trim();
  }

  return asset;
}

function enrichWithInteractionAndImageIds(fileContents) {
  const $ = cheerio.load(fileContents);
  $('a,button,input[type=button]').attr(
    'data-interaction-id',
    (el, val) => val || uuid()
  );

  $('img')
    .toArray()
    .forEach(img => {
      const origSrc = $(img)
        .attr('src')
        .trim();
      if (origSrc.startsWith('data:')) return;

      $(img).attr('data-image-id', uuid());
    });
  return { markup: $.html() };
}

export function processHtmlFile(
  file,
  uploadDirectory,
  extractionBasePath,
  directoryName
) {
  const filePath = path.resolve(extractionBasePath, file);
  const { markup } = enrichWithInteractionAndImageIds(
    fs.readFileSync(filePath).toString()
  );
  const name = filePath
    .split('/')
    .filter(Boolean)
    .pop();
  const assets = [
    ...extractStyleAssets(
      markup,
      path.relative(
        uploadDirectory,
        path.join(extractionBasePath, path.dirname(file))
      )
    ),
    ...extractScriptAssets(
      markup,
      path.relative(
        uploadDirectory,
        path.join(extractionBasePath, path.dirname(file))
      )
    ),
    ...extractImageAssets(
      markup,
      path.relative(
        uploadDirectory,
        path.join(extractionBasePath, path.dirname(file))
      )
    )
  ];
  const body = extractDocumentBody(markup);
  const head = extractDocumentHead(markup);
  const htmlElementAttributes = extractHtmlElementAttributes(markup);
  return {
    name,
    body,
    head,
    assets,
    htmlElementAttributes,
    thumbnailPath: `${directoryName}${path.sep}thumbnail-${name}.png`
  };
}
