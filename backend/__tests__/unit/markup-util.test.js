import * as MarkupUtil from '../../src/markup-util';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import { createTestDatabaseConnection } from '../util/setup';

describe('MarkupUtil', () => {
  let connection;
  beforeAll(async () => {
    connection = createTestDatabaseConnection();
    await connection.connect();
  });

  afterAll(() => {
    connection.close();
  });

  describe('extractScriptAssets', async () => {
    it('should return all script assets defined in an HTML document', async () => {
      const markup = readFileSync(
        resolvePath(__dirname, '../dummy-page.html')
      ).toString();
      const scriptAssets = await MarkupUtil.extractScriptAssets(markup, '');
      expect(scriptAssets.length).toEqual(2);
      expect(scriptAssets.filter(asset => asset.isInline).length).toEqual(1);
    });
  });
  describe('extractStyleAssets', async () => {
    it('should return all style assets defined in an HTML document', async () => {
      const markup = readFileSync(
        resolvePath(__dirname, '../dummy-page.html')
      ).toString();
      const styleAssets = await MarkupUtil.extractStyleAssets(markup, '');
      expect(styleAssets.length).toEqual(2);
      expect(styleAssets.filter(asset => asset.isInline).length).toEqual(1);
    });
  });
  describe('extractDocumentBody', () => {
    it("should return the contents of the document's body section", () => {
      const markup = readFileSync(
        resolvePath(__dirname, '../dummy-page.html')
      ).toString();
      const body = MarkupUtil.extractDocumentBody(markup);
      expect(body).toContain(`id="app"`);
    });
  });
  describe('extractDocumentHead', () => {
    it('should return the contents of the document head without any css|js contents|references', () => {
      const markup = readFileSync(
        resolvePath(__dirname, '../dummy-page.html')
      ).toString();
      const head = MarkupUtil.extractDocumentHead(markup);
      expect(head).toContain('<title>Test Document</title>');
      expect(head).not.toContain('rel="stylesheet"');
      expect(head).not.toContain('src="');
      expect(head).not.toContain('href="');
    });
  });
  describe('extractHtmlElementAttributes', () => {
    it("should return the document's html element attributes", () => {
      const markup = readFileSync(
        resolvePath(__dirname, '../dummy-page.html')
      ).toString();
      const attributes = MarkupUtil.extractHtmlElementAttributes(markup);
      expect(attributes.lang).toEqual('en');
      expect(attributes.class).toEqual('no-js');
    });
  });
});
