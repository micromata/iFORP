import React from 'react';
import PropTypes from 'prop-types';

import {FormatJson} from '../../shared/format-json';

/**
 * NewProject
 * ProjectList
 * 	ProjectListItem
 */

const data = [
	{
		id: 1,
		name: 'Project 1',
		thumbnail: 'http://via.placeholder.com/200x150'
	},
	{
		id: 2,
		name: 'Project 2',
		thumbnail: 'http://via.placeholder.com/200x150'
	},
	{
		id: 3,
		name: 'Project 3',
		thumbnail: 'http://via.placeholder.com/200x150'
	}
];

export const Home = () => (
	<main id="start" className="container">
		<NewProject />
		<ProjectList projects={data} />
	</main>
);

const NewProject = () => (
	<h1 className="jumbotron-heading mb-5">Start prototyping with a</h1>
);

const ProjectList = ({projects}) => (
	<React.Fragment>
		<p>Liste mit Projekten</p>
		<ul>
			{projects.map(project => <ProjectListItem key={project.id} project={project}/>)}
		</ul>
		<FormatJson json={projects} />
	</React.Fragment>
);

ProjectList.propTypes = {
	projects: PropTypes.array
};

const ProjectListItem = ({project}) => (
	<li>{project.name}</li>
);

ProjectListItem.propTypes = {
	project: PropTypes.object
};

