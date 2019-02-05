import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './HTMLPage.styles';
import { baseURL } from '../../utils';

export class HTMLPage extends Component {
  iframeDocument = '';

  componentDidMount() {
    this.iframeDocument = this.node.contentDocument;

    // Create and insert html5 doctype
    const doctype = this.iframeDocument.implementation.createDocumentType('html', '', '');
    this.iframeDocument.insertBefore(doctype, this.iframeDocument.querySelector('html'));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.viewportSize === this.props.viewportSize) {
      this.injectIframeContent();
    }
  }

  handleInteractionElementClick = event => {
      event.preventDefault();
      if (!this.props.onInteractionElementClick) return;

      this.props.onInteractionElementClick(event.target.attributes['data-interaction-id'].value);
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

    htmlElement.style = 'visibility: hidden';

    // Fill head element
    this.iframeDocument.head.innerHTML = this.props.head;


    // Fill body element
    this.iframeDocument.body.innerHTML = this.props.body;

    // Insert JavaScript and CSS assets to the view
    this.props.assets.forEach(asset => {
      if (asset.type === 'js') {
        this.iframeDocument.body.append(
          this.getScriptElement(this.iframeDocument, asset)
        );
      } else {
        this.iframeDocument.head.append(
          this.getLinkElement(this.iframeDocument, asset)
        );
      }
    });

    this.iframeDocument.body.
      querySelectorAll('[data-interaction-id]').
      forEach(link => link.addEventListener('click', this.handleInteractionElementClick));

    setTimeout(() => { htmlElement.style = ''; }, 100);
  }

  getLinkElement(iframe, asset) {
    const styleElement =
      asset.contents === null
        ? iframe.createElement('link')
        : iframe.createElement('style');

    if (asset.location === null) {
      styleElement.append(iframe.createTextNode(asset.contents));
    } else {
      styleElement.rel = 'stylesheet';
      styleElement.href = `${baseURL}/library/${asset.location}`;
    }

    return styleElement;
  }

  getScriptElement(iframe, asset) {
    const scriptElement = iframe.createElement('script');

    if (asset.location === null) {
      scriptElement.append(iframe.createTextNode(asset.contents));
    } else {
      scriptElement.src = `${baseURL}/library/${asset.location}`;
      scriptElement.async = false;
    }

    return scriptElement;
  }

  render() {
    return (
      <div className={ `${this.props.classes.HTMLPage} preview-wrapper ${this.props.viewportSize}` }>
        <iframe
          className={`preview ${this.props.viewportSize}`}
          frameBorder="0"
          ref={node => { this.node = node }}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(HTMLPage);
