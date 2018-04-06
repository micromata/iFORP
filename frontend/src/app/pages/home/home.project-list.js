import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import {FormatJson} from '../../shared/format-json';
import {ProjectListItem} from './home.project-list-item';

export const ProjectList = ({projects}) => (
	<React.Fragment>
		<div className="row justify-content-md-center text-center">
			{projects.map((project, index) => <ProjectListItem index={index} key={project.id} project={project}/>)}
			<div className="col-md-1 align-self-center">
				<Link className="btn btn-secondary" to="/projects"><span className="oi oi-ellipses"></span></Link>
			</div>
		</div>
		{/* <FormatJson json={projects} /> */}
	</React.Fragment>
);

ProjectList.propTypes = {
	projects: PropTypes.array
};
