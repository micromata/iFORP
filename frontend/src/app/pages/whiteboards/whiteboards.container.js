import React from 'react';
import {PropTypes} from 'prop-types';

export class Whiteboards extends React.Component {

	state = {
		whiteboards: []
	};

	async componentDidMount() {
		console.log(this.props.match.params);
	}

	render() {
		return (
			<main id="" className="container">
				Whiteboards des Projektes <code>{this.props.match.params.projectId}</code><br/>
				Ausgewähltes Whiteboard: <code>{this.props.match.params.whiteboardId}</code>
			</main>
		);
	}
}

Whiteboards.propTypes = {
	match: PropTypes.object
};
