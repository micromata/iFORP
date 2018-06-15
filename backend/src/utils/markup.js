import cheerio from 'cheerio';
import path from 'path';
import { Asset } from '../orm/entity/asset';
import fs from 'fs-extra';

export function extractScriptAssets(markup, fileBaseFolder) {
  const $ = cheerio.load(markup, fileBaseFolder);
  const scripts = $('script');
  return scripts.toArray().map(el => {
    const asset = mapElementToAsset(el, fileBaseFolder);
    asset.type = 'js';
    return asset;
  });
}

export function extractStyleAssets(markup, fileBaseFolder) {
  const $ = cheerio.load(markup);
  const inlineStyles = $('style');
  const linkedStyles = $('link[rel="stylesheet"]');
  return [...inlineStyles.toArray(), ...linkedStyles.toArray()].map(el => {
    const asset = mapElementToAsset(el, fileBaseFolder);
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

function mapElementToAsset(el, fileBaseFolder) {
  const asset = new Asset();
  const styleSrc = el.attribs.src || el.attribs.href;
  if (styleSrc) {
    asset.location = path.join(fileBaseFolder, styleSrc);
  } else {
    asset.contents = el.firstChild.nodeValue.trim();
  }
  return asset;
}

export function processHtmlFile(file, extractionBasePath) {
  const filePath = path.resolve(extractionBasePath, file);
  const fileContents = fs.readFileSync(filePath).toString();
  const fileBaseFolder = path.resolve(
    '/',
    ...filePath
      .split('/')
      .filter(Boolean)
      .slice(0, -1)
  );
  const name = filePath
    .split('/')
    .filter(Boolean)
    .pop();
  const body = extractDocumentBody(fileContents);
  const head = extractDocumentHead(fileContents);
  const assets = [
    ...extractStyleAssets(fileContents, fileBaseFolder),
    ...extractScriptAssets(fileContents, fileBaseFolder)
  ];
  const htmlElementAttributes = extractHtmlElementAttributes(fileContents);
  return {
    name,
    body,
    head,
    assets,
    htmlElementAttributes
  };
}
