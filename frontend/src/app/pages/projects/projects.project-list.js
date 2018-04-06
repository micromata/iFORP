import React from 'react';
import {PropTypes} from 'prop-types';
import {ProjectListItem} from './projects.project-list-item';

export const ProjectList = ({projects, searchTerm}) => (
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
