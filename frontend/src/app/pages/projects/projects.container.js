import React from 'react';
import {Link} from 'react-router-dom';

import {FormatJson} from '../../shared/format-json';
import {get} from '../../base/http';
import {PropTypes} from 'prop-types';

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

const Header = () => (
	<div className="row text-center mb-4">
		<div className="col-2 text-left align-self-center">
			<Link to="/"><span className="oi oi-chevron-left"></span></Link>
		</div>
		<div className="col-10">
			<h1 className="h2">Projekte</h1>
		</div>
	</div>
);

const ProjectSearch = ({searchTerm, onSearchInput}) => (
	<div className="row">
		<form className="form-inline mt-2 ml-3 mb-3">
			<input className="form-control mr-sm-2" type="text" value={searchTerm} onChange={onSearchInput} placeholder="Search" aria-label="Search" />
			<button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
		</form>
	</div>
);

ProjectSearch.propTypes = {
	searchTerm: PropTypes.string,
	onSearchInput: PropTypes.func
};

const ProjectList = ({projects, searchTerm}) => (
	<div className="row text-center">
		{projects
			.filter(project => project.name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
			.map(project => <ProjectListItem key={project.id} project={project} />)
		}
	</div>
);

ProjectList.propTypes = {
	projects: PropTypes.array,
	searchTerm: PropTypes.string
};

const ProjectListItem = ({project: {id, thumbnail, name}}) => (
	<a href={id}>
		<div className="card m-3">
			<img className="card-img-top rounded" src={thumbnail} alt="Card image cap" />
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
			</div>
		</div>
	</a>
);

ProjectListItem.propTypes = {
	project: PropTypes.object
};
