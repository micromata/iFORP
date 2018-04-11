import React from 'react';
import {PropTypes} from 'prop-types';

import {get} from '../../base/http';
import {FormatJson} from '../../shared/format-json';
import {Header} from './whiteboards.header';
import {Views} from './whiteboards.views';

export class Whiteboards extends React.Component {

	state = {
		whiteboards: [],
		currentWhiteboard: {},
		project: {}
	};

	async getData(projectId, whiteboardId) {
		const whiteboards = await get(`whiteboards/list/${projectId}`);

		// Need to get the whiteboard from the response in case someone opens a project via
		// /whiteboards/project-id/:projectId instead of
		// /whiteboards/project-id/:projectId/whiteboard-id/:whiteboardId
		if (!whiteboardId) {
			whiteboardId = whiteboards[0].id;
		}
		const currentWhiteboard = await get(`whiteboards/details/${whiteboardId}`);
		const project = await get(`projects/details/${projectId}`);
		return {whiteboards, currentWhiteboard, project};
	}

	async componentDidMount() {

		// Get IDs from path parameters
		const {projectId, whiteboardId} = this.props.match.params;
		this.setState(await this.getData(projectId, whiteboardId));
	}

	async componentWillReceiveProps(nextProps) {

		// Get project ID from click on dropdown item in whiteboards.header.js
		const {projectId} = this.props.match.params;
		this.setState(await this.getData(projectId, nextProps.location.state.clickedWhiteboard.id));
	}

	render() {
		return (
			<main id="whiteboard" className="container">
				<Header
					project={this.state.project}
					currentWhiteboard={this.state.currentWhiteboard}
					whiteboards={this.state.whiteboards}
				/>
				<Views views={this.state.currentWhiteboard.views} />
				<FormatJson json={this.state} />
			</main>
		);
	}
}

Whiteboards.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object
};
