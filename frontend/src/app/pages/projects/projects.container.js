import React from 'react';

import {FormatJson} from '../../shared/format-json';
import {get} from '../../base/http';
import {Header} from './projects.header';
import {ProjectSearch} from './projects.project-search';
import {ProjectList} from './projects.project-list';

export class Projects extends React.Component {

	state = {
		projects: [],
		searchTerm: ''
	};

	handleSearch = event => {
		this.setState({searchTerm: event.target.value});
	}

	async componentDidMount() {
		const projects = await get('projects/list');
		this.setState({projects});
	}

	render() {
		return (
			<main id="projects" className="container">
				<Header />
				<ProjectSearch searchTerm={this.state.searchTerm} onSearchInput={this.handleSearch} />
				<ProjectList projects={this.state.projects} searchTerm={this.state.searchTerm} />
				<FormatJson json={this.state.projects} />
			</main>
		);
	}
}
