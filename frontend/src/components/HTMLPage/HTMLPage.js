import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './HTMLPage.styles';
import { baseURL } from '../../utils';
import { initInteractionElementDrawing } from './interaction-element-drawing';
import config from '../../config';

export class HTMLPage extends Component {
  iframeDocument = '';

  componentDidMount() {
    this.iframeDocument = this.node.contentDocument;

    // Create and insert html5 doctype
    const doctype = this.iframeDocument.implementation.createDocumentType('html', '', '');
    this.iframeDocument.insertBefore(doctype, this.iframeDocument.querySelector('html'));
    this.injectIframeContent();
  }

  componentDidUpdate() {
    this.injectIframeContent();
  }

  handleInteractionElementClick = event => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.props.onInteractionElementClick) return;

    this.props.onInteractionElementClick(event.target.attributes['data-interaction-id'].value);
  }

  handleAddAnnotation = event => {
    event.preventDefault();
    if (!this.props.onAnnotate || !this.props.isAnnotationModeActive) return;

    this.props.onAnnotate({x: event.pageX - 15, y: event.pageY - 15 });
  }

  handleAnnotationClicked = event => {
    event.stopPropagation();
    const annotationId = Number(event.target.attributes['data-annotation-id'].value);
    console.log('annotation clicked', { annotationId });
  }

  unhighlightInteractionElements = () => {
    this.iframeDocument.body.
      querySelectorAll('.interaction-element-rect').
      forEach(item => item.classList.remove('interaction-element-rect-highlighted'));
  }

  highlightInteractionElements = () => {
    this.iframeDocument.body.
      querySelectorAll('.interaction-element-rect').
      forEach(item => item.classList.add('interaction-element-rect-highlighted'));

    window.setTimeout(this.unhighlightInteractionElements, 500);
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

    const additionalCSS = `
      <style>
        body {
          counter-reset: interactionElementCounter;
          cursor: ${ this.props.allowInteractionElementCreation ? 'crosshair' : 'default' };
          background: rgba(255, 255, 255, 0);
          width: ${config.widthForViewportSize[this.props.viewportSize]}px;
        }

        body:empty {
          background: transparent;
        }

        .annotation {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          z-index: 999999;
          background: #EE9A02;
          color: #FFF;
          line-height: 30px;
          text-align: center;
          font-family: Verdana, Sans Serif;
        }

        #new-interaction-element-rect {
          border: 1px dashed #EE9A02;
          background-color: rgb(240, 188, 72, 0.4);
          position: absolute;
          visibility: hidden;
        }

        .interaction-element-rect {
          border: 1px dashed #EE9A02;
          background-color: rgb(240, 188, 72, 0.4);
          position: absolute;
          opacity: ${this.props.allowInteractionElementCreation ? '1' : '0'};
          cursor: ${ this.props.allowInteractionElementCreation ? 'default' : 'pointer' };
        }

        .interaction-element-rect-highlighted {
          border: 1px dashed #EE9A02;
          background-color: rgb(240, 188, 72, 0.4);
          position: absolute;
          opacity: 1;
        }

        .interaction-element-rect::before {
          counter-increment: interactionElementCounter;
          content: counter(interactionElementCounter);
          color: #FFF;
          width: 20px;
          height: 20px;
          background: #EE9A02;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial;
          font-size: 10px;
          margin-top: -10px;
          margin-left: -10px;
          visibility: ${this.props.allowInteractionElementCreation ? 'visible' : 'hidden'}
        }
      </style>`;

    const annotationsMarkup = this.props.isAnnotationModeActive ?
      this.props.annotations.map((annotation, index) => `
      <div class='annotation' style='top: ${annotation.y}px; left: ${annotation.x}px; cursor: pointer;' data-annotation-id='${annotation.id}'>
        ${index+1}
      </div>
    `).join('') : '';

    htmlElement.style = 'visibility: hidden';

    const newInteractionElementMarkup = this.props.allowInteractionElementCreation ?
      `<div id='new-interaction-element-rect'></div>` :
      '';

    const existingInteractionElementsMarkup = this.props.imageInteractionElements ?
      this.props.imageInteractionElements.map(item => `
        <div
          class='interaction-element-rect'
          data-interaction-id='${item.id}'
          style='left: ${item.x + this.props.horizontalOffset}px; top: ${item.y}px; width: ${item.width}px; height: ${item.height}px'
        >
        </div>
      `).join('') : '';

    // Fill head element
    this.iframeDocument.head.innerHTML = `${this.props.head} ${additionalCSS}`;


    // Fill body element
    const bodyHtml = `
      ${this.props.body}
      ${annotationsMarkup}
      ${newInteractionElementMarkup}
      ${existingInteractionElementsMarkup}`.trim();
    this.iframeDocument.body.innerHTML = bodyHtml;

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

    if (this.props.isAnnotationModeActive) {
      this.iframeDocument.body.addEventListener('click', this.handleAddAnnotation);

      this.iframeDocument.body.
        querySelectorAll('.annotation').
        forEach(annotation => annotation.addEventListener('click', this.handleAnnotationClicked));
    }

    if (this.props.imageInteractionElements && !this.props.isAnnotationModeActive) {
      this.iframeDocument.body.addEventListener('click', this.highlightInteractionElements);
    }

    if (this.props.allowInteractionElementCreation && this.props.onCreateInteractionElement) {
      initInteractionElementDrawing(
        this.iframeDocument.body,
        this.iframeDocument.body.querySelector('#new-interaction-element-rect'),
        this.props.horizontalOffset,
        this.props.onCreateInteractionElement);
    }

    setTimeout(() => { htmlElement.style = ''; }, 100); // eslint-disable-line max-statements-per-line
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
