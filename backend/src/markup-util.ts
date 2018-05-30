import { Asset } from './orm/entity/Asset';
import * as cheerio from 'cheerio';

export function extractScriptAssets(
  markup: string,
  pathPrefix: string
): Asset[] {
  const $ = cheerio.load(markup);
  const scripts = $('script');
  return scripts.toArray().map(el => {
    const asset = mapElementToAsset(el, pathPrefix);
    asset.type = 'js';
    return asset;
  });
}

export function extractStyleAssets(
  markup: string,
  pathPrefix: string
): Asset[] {
  const $ = cheerio.load(markup);
  const inlineStyles = $('style');
  const linkedStyles = $('link[rel="stylesheet"]');
  return [...inlineStyles.toArray(), ...linkedStyles.toArray()].map(el => {
    const asset = mapElementToAsset(el, pathPrefix);
    asset.type = 'css';
    return asset;
  });
}

function removeAssetsFromDocument($: CheerioStatic) {
  $('link[rel="stylesheet"]').remove();
  $('style').remove();
  $('script').remove();
}

export function extractHtmlElementAttributes(
  markup: string
): { [key: string]: string } {
  const $ = cheerio.load(markup);
  return $('html').get(0).attribs;
}

export function extractDocumentHead(markup: string): string {
  const $ = cheerio.load(markup);
  removeAssetsFromDocument($);
  return $('head')
    .html()
    .trim();
}

export function extractDocumentBody(markup: string): string {
  const $ = cheerio.load(markup);
  removeAssetsFromDocument($);
  return $('body')
    .html()
    .trim();
}

function mapElementToAsset(el: CheerioElement, pathPrefix: string): Asset {
  const asset = new Asset();
  const styleSrc = el.attribs.src || el.attribs.href;
  if (styleSrc) {
    asset.location = pathPrefix + styleSrc;
  } else {
    asset.contents = el.firstChild.nodeValue.trim();
  }
  return asset;
}
