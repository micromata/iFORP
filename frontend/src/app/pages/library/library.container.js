import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../shared/format-json';
import {Header} from './library.header';

export class Library extends React.Component {

	state = {
		view: undefined
	};

	componentDidMount() {

		// Get ID from path parameters
		const {viewId} = this.props.match.params;
		this.setState({view: viewId});
	}

	render() {
		return (
			<main id="" className="container">
				<Header projectId={this.props.match.params.projectId} whiteboardId={this.props.match.params.whiteboardId} />
				<h2>Library</h2>
				<FormatJson state={this.state}></FormatJson>
			</main>
		);
	}
}

Library.propTypes = {
	match: PropTypes.object
};
