import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types';

export class Content extends React.Component {

	updateIframeContent() {
		this.props.scripts.forEach(script => {
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
		this.updateIframeContent();
	}

	render() {
		return (
			<iframe
				className="preview-container"
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
	scripts: PropTypes.array
};
