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
  const styleSrc = el.attribs.src || el.attribs.href;
  if (styleSrc) {
    asset.location = path.join(relPath, styleSrc);
  } else {
    asset.contents = el.firstChild.nodeValue.trim();
  }
  return asset;
}

function enrichWithInteractionIds(fileContents) {
  const $ = cheerio.load(fileContents);
  $('a,button,input[type=button]').attr(
    'data-interaction-id',
    (el, val) => val || uuid()
  );
  return { markup: $.html() };
}

export function processHtmlFile(
  file,
  uploadDirectory,
  extractionBasePath,
  directoryName
) {
  const filePath = path.resolve(extractionBasePath, file);
  const { markup } = enrichWithInteractionIds(
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
