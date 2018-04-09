import React from 'react';

import {get, post} from '../../base/http';
import {NewProject} from './home.new-project';
import {ProjectList} from './home.project-list';

export class Home extends React.Component {

	state = {
		projects: []
	};

	amountOfProjectsToShow = 3;

	handleNewProject = async () => {
		const name = `Project ${this.state.projects.length + 1}`;
		const response = await post('projects/create', {name});
		console.log(response);
	}

	async componentDidMount() {
		const projects = await get('projects/list');
		this.setState({projects: projects.filter((project, index) => index < this.amountOfProjectsToShow)});
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
