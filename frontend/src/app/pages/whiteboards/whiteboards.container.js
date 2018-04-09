import React from 'react';
import {PropTypes} from 'prop-types';

import {get} from '../../base/http';
import {FormatJson} from '../../shared/format-json';

export class Whiteboards extends React.Component {

	state = {
		whiteboards: [],
		currentWhiteboard: {},
		project: {}
	};

	async componentDidMount() {
		const {projectId, whiteboardId} = this.props.match.params;
		const whiteboards = await get(`whiteboards/list/${projectId}`);
		const currentWhiteboard = await get(`whiteboards/details/${whiteboardId}`);
		const project = await get(`projects/details/${projectId}`);
		this.setState({whiteboards, currentWhiteboard, project});
	}

	render() {
		return (
			<main id="" className="container">
				Whiteboards des Projektes <code>{this.props.match.params.projectId}</code><br/>
				Ausgewähltes Whiteboard: <code>{this.props.match.params.whiteboardId}</code>
				<FormatJson json={this.state} />
			</main>
		);
	}
}

Whiteboards.propTypes = {
	match: PropTypes.object
};
