import cheerio from 'cheerio';
import path from 'path';
import { Asset } from '../orm/entity/asset';
import fs from 'fs-extra';

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

export function processHtmlFile(file, uploadDirectory, extractionBasePath) {
  const filePath = path.resolve(extractionBasePath, file);
  const fileContents = fs.readFileSync(filePath).toString();
  const name = filePath
    .split('/')
    .filter(Boolean)
    .pop();
  const assets = [
    ...extractStyleAssets(
      fileContents,
      path.relative(
        uploadDirectory,
        path.join(extractionBasePath, path.dirname(file))
      )
    ),
    ...extractScriptAssets(
      fileContents,
      path.relative(
        uploadDirectory,
        path.join(extractionBasePath, path.dirname(file))
      )
    )
  ];
  const body = extractDocumentBody(fileContents);
  const head = extractDocumentHead(fileContents);
  const htmlElementAttributes = extractHtmlElementAttributes(fileContents);
  return {
    name,
    body,
    head,
    assets,
    htmlElementAttributes
  };
}
