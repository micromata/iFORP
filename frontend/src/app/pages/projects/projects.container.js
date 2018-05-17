import React from 'react';
import http from 'axios';
import {Header} from './projects.header';
import {ProjectSearch} from './projects.project-search';
import {ProjectList} from './projects.project-list';

export class Projects extends React.Component {
	state = {
		projects: [],
		searchTerm: ''
	};

	handleSearch = searchTerm => {
		this.setState({searchTerm});
	};

	async componentDidMount() {
		const projects = await http.get('http://localhost:3000/projects')
			.then(res => res.data);
		this.setState({projects});
	}

	render() {
		return (
			<main id="projects" className="container">
				<Header />
				<ProjectSearch
					searchTerm={this.state.searchTerm}
					onSearchInput={this.handleSearch}
				/>
				<ProjectList
					projects={this.state.projects}
					searchTerm={this.state.searchTerm}
				/>
				{/* <FormatJson json={this.state.projects} /> */}
			</main>
		);
	}
}
