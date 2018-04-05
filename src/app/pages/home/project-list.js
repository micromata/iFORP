import React from 'react';
import PropTypes from 'prop-types';

import {FormatJson} from '../../shared/format-json';
import {ProjectListItem} from './project-list-item';

export const ProjectList = ({projects}) => (
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
