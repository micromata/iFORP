import React from 'react';
import {PropTypes} from 'prop-types';

export class Content extends React.Component {

	iframeDocument = '';

	iframeContentInjected = false;

	componentDidMount() {
		const iframeDocument = this.node.contentDocument;
		this.iframeDocument = iframeDocument;

		// Create and insert html5 doctype
		const doctype = this.iframeDocument.implementation.createDocumentType('html', '', '');
		this.iframeDocument.insertBefore(doctype, this.iframeDocument.querySelector('html'));
	}

	componentDidUpdate() {
		if (!this.iframeContentInjected) {
			this.injectIframeContent();
		}
		this.iframeContentInjected = true;
	}

	injectIframeContent() {

		// Apply attributes to HTML element
		const htmlElement = this.iframeDocument.querySelector('html');
		this.props.htmlElementAttributes.forEach(attribute => {
			htmlElement.setAttribute(attribute.name, attribute.value);
		});

		// Fill head element
		this.iframeDocument.head.innerHTML = this.props.head;

		// Insert CSS of the view
		this.props.css.forEach(link => {
			const linkElem = this.getLinkElement(this.iframeDocument, link);
			this.iframeDocument.head.appendChild(linkElem);
		});

		// Fill body element
		this.iframeDocument.body.innerHTML = this.props.body;

		// Insert JavaScript of the view
		this.props.js.forEach(script => {
			this.iframeDocument.body.appendChild(this.getScriptElement(this.iframeDocument, script));
		});
	}

	getLinkElement(iframe, linkHref) {
		const linkElement = iframe.createElement('link');
		linkElement.href = linkHref;
		linkElement.rel = 'stylesheet';
		return linkElement;
	}

	getScriptElement(iframe, script) {
		const scriptElement = iframe.createElement('script');

		if (script.type === 'inline') {
			scriptElement.appendChild(iframe.createTextNode(script.content));
		} else {
			scriptElement.src = script.href;
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
					ref={(node) => {
						this.node = node;
					}} />
			</div>
		);
	}

}

Content.propTypes = {
	htmlElementAttributes: PropTypes.array,
	head: PropTypes.string,
	body: PropTypes.string,
	css: PropTypes.array,
	js: PropTypes.array,
	viewportSize: PropTypes.string
};
