import React from 'react';
import {Link} from 'react-router-dom';

import {FormatJson} from '../../shared/format-json';
import {get} from '../../base/http';
import {PropTypes} from 'prop-types';

/*
PageComponent
	ProjectsHeader
	ProjectsSearch
	ProjectsList
		ProjectsListItem
*/

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
				<ProjectsHeader />
				<ProjectsSearch />
				<ProjectsList projects={this.state.projects} />
				<FormatJson json={this.state.projects} />
			</main>
		);
	}
}

const ProjectsHeader = () => (
	<div className="row text-center mb-4">
		<div className="col-2 text-left align-self-center">
			<Link to="/"><span className="oi oi-chevron-left"></span></Link>
		</div>
		<div className="col-10">
			<h1 className="h2">Projekte</h1>
		</div>
	</div>
);

const ProjectsSearch = () => (
	<div className="row">
		<form className="form-inline mt-2 ml-3 mb-3">
			<input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
			<button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
		</form>
	</div>
);

const ProjectsList = ({projects}) => (
	<div className="row text-center">
		{projects.map(project => <ProjectsListItem key={project.id} project={project} />)}
	</div>
);

ProjectsList.propTypes = {
	projects: PropTypes.array
};

const ProjectsListItem = ({project: {id, thumbnail, name}}) => (
	<a href={id}>
		<div className="card m-3">
			<img className="card-img-top rounded" src={thumbnail} alt="Card image cap" />
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
			</div>
		</div>
	</a>
);

ProjectsListItem.propTypes = {
	project: PropTypes.object
};
