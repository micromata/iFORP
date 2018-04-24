import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types';

export class Content extends React.Component {

	iframeRendered = false;

	iframeDocument = '';

	updateIframeContent() {
		// Create and insert html5 doctype
		const doctype = this.iframeDocument.implementation.createDocumentType('html', '', '');
		this.iframeDocument.insertBefore(doctype, this.iframeDocument.querySelector('html'));

		// Insert script elements
		this.props.js.forEach(script => {
			this.iframeDocument.body.appendChild(this.getScriptElement(this.iframeDocument, script));
		});

		ReactDOM.render((
			<html>
				<head dangerouslySetInnerHTML={{__html: this.props.head}} />
				<body dangerouslySetInnerHTML={{__html: this.props.body}} />
			</html>
			), this.iframeDocument);
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

	componentDidMount() {
		const iframeDocument = this.node.contentDocument;
		iframeDocument.removeChild(iframeDocument.querySelector('html'));

		this.iframeDocument = iframeDocument;
		this.updateIframeContent();
	}

	componentDidUpdate() {
		if (!this.iframeRendered) {
			this.updateIframeContent();
		}
		this.iframeRendered = true;
	}

	render() {
		return (
			<iframe
				className={`preview ${this.props.viewportSize}`}
				frameBorder="0"
				ref={(node) => {
					this.node = node;
				}} />
		);
	}

}

Content.propTypes = {
	head: PropTypes.string,
	body: PropTypes.string,
	js: PropTypes.array,
	viewportSize: PropTypes.string
};
