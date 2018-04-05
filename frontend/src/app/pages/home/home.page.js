import React from 'react';

import {NewProject} from './new-project';
import {ProjectList} from './project-list';

export class Home extends React.Component {

	state = {
		projects: []
	};

	componentDidMount() {
		fetch('http://localhost:8087/api/projects/home')
			.then(response => response.json())
			.then(projects => {
				this.setState({projects});
			});
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
