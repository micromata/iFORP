import React from 'react';
import { PropTypes } from 'prop-types';

export class Iframe extends React.Component {
  iframeDocument = '';

  componentDidMount() {
    this.iframeDocument = this.node.contentDocument;

    // console.log(this.iframeDocument);

    // Create and insert html5 doctype
    const doctype = this.iframeDocument.implementation.createDocumentType(
      'html',
      '',
      ''
    );
    this.iframeDocument.insertBefore(
      doctype,
      this.iframeDocument.querySelector('html')
    );

    this.iframeDocument.addEventListener('DOMNodeInserted', event => {
      console.log(event);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.viewportSize === this.props.viewportSize) {
      this.injectIframeContent();
    }
  }

  injectIframeContent() {
    // Apply attributes to HTML element
    const htmlElement = this.iframeDocument.querySelector('html');
    Object.keys(this.props.htmlElementAttributes).forEach(attrName => {
      if (this.props.htmlElementAttributes[attrName])
        htmlElement.setAttribute(
          attrName,
          this.props.htmlElementAttributes[attrName]
        );
    });

    // Fill head element
    this.iframeDocument.head.innerHTML = this.props.head;

    // Fill body element
    this.iframeDocument.body.innerHTML = this.props.body;

    // Insert JavaScript and CSS assets to the view
    this.props.assets.forEach(asset => {
      if (asset.type === 'js') {
        this.iframeDocument.body.appendChild(
          this.getScriptElement(this.iframeDocument, asset)
        );
      } else {
        this.iframeDocument.head.appendChild(
          this.getLinkElement(this.iframeDocument, asset)
        );
      }
    });
    const webpackPubPath = this.iframeDocument.createElement('script');
    this.iframeDocument.body.appendChild(webpackPubPath);
    // Insert Script to highjack interaction elements
    const pageChanger = this.iframeDocument.createElement('script');
    pageChanger.src = '/assets/page-changer/view.content.page-changer.js';
    pageChanger.async = false;
    this.iframeDocument.body.appendChild(pageChanger);
  }

  getLinkElement(iframe, asset) {
    const styleElement =
      asset.contents === null
        ? iframe.createElement('link')
        : iframe.createElement('style');

    if (asset.location === null) {
      styleElement.appendChild(iframe.createTextNode(asset.contents));
    } else {
      styleElement.rel = 'stylesheet';
      styleElement.href = 'http://localhost:3000/library/' + asset.location;
    }

    return styleElement;
  }

  getScriptElement(iframe, asset) {
    const scriptElement = iframe.createElement('script');

    if (asset.location === null) {
      scriptElement.appendChild(iframe.createTextNode(asset.contents));
    } else {
      scriptElement.src = 'http://localhost:3000/library/' + asset.location;
      scriptElement.async = false;
    }

    return scriptElement;
  }

  render() {
    return (
      <div className="preview-wrapper">
        <iframe
          className={`preview ${this.props.viewportSize}`}
          frameBorder="0"
          ref={node => {
            this.node = node;
          }}
        />
      </div>
    );
  }
}

Iframe.propTypes = {
  htmlElementAttributes: PropTypes.object,
  head: PropTypes.string,
  body: PropTypes.string,
  assets: PropTypes.array,
  viewportSize: PropTypes.oneOf(['desktop', 'tablet', 'phone'])
};
