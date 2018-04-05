import React from 'react';
import request from 'axios';

import {NewProject} from './new-project';
import {ProjectList} from './project-list';

export class Home extends React.Component {

	state = {
		projects: []
	};

	async componentDidMount() {
		try {
			const {data} = await request.get('http://localhost:8087/api/projects/home');
			console.log(data);
			this.setState({projects: data});
		} catch (error) {
			console.error(error);
		}
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
