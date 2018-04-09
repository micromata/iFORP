import React from 'react';

import {get} from '../../base/http';
import {NewProject} from './home.new-project';
import {ProjectList} from './home.project-list';

export class Home extends React.Component {

	state = {
		projects: []
	};

	handleNewProject = () => {
		console.log('createNewProject');
		console.log(this.state.projects);
	}

	async componentDidMount() {
		const projects = await get('projects/home');
		this.setState({projects});
	}

	render() {
		return (
			<main id="start" className="container">
				<NewProject onNewProject={this.handleNewProject} />
				<ProjectList projects={this.state.projects} />
			</main>
		);
	}
}
