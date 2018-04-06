import React from 'react';

import {FormatJson} from '../../shared/format-json';
import {get} from '../../base/http';

export class Projects extends React.Component {

	state = {
		projects: []
	};

	async componentDidMount() {
		const projects = await get('projects/list');
		this.setState({projects});
	}

	render() {
		return (
			<main id="projects" className="container">
				<h2>Projekte</h2>
				<FormatJson json={this.state.projects} />
			</main>
		);
	}
}
