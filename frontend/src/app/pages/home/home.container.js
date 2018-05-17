import React from 'react';
import {PropTypes} from 'prop-types';

import http from 'axios';
import {NewProject} from './home.new-project';
import {ProjectList} from './home.project-list';

export class Home extends React.Component {

	state = {
		projects: []
	};

	handleNewProject = async () => {
		const newProject = await http.post('http://localhost:3000/projects')
			.then(res => res.data);
		this.props.history.push(`/whiteboards/project/${newProject.id}/whiteboard/${newProject.whiteboards.pop().id}`);
	}

	async componentDidMount() {
		const projects = await http.get('http://localhost:3000/projects')
			.then(res => res.data);
		console.log(projects);
		this.setState({projects});
	}

	render() {
		return (
			<main id="start" className="container">
				<NewProject onNewProject={this.handleNewProject}/>
				<ProjectList projects={this.state.projects}/>
				{/* <FormatJson json={this.state} /> */}
			</main>
		);
	}
}

Home.propTypes = {
	history: PropTypes.object
};
