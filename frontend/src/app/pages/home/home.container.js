import React from 'react';

import {get} from '../../base/http';
import {NewProject} from './home.new-project';
import {ProjectList} from './home.project-list';

export class Home extends React.Component {

	state = {
		projects: []
	};

	async componentDidMount() {
		const projects = await get('projects/home');
		this.setState({projects});
	}

	render() {
		return (
			<main id="start" className="container">
				<NewProject />
				<ProjectList projects={this.state.projects} />
			</main>
		);
	}
}
