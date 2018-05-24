import React from 'react';
import {PropTypes} from 'prop-types';

export const NewProject = ({onNewProject, hasProjects}) => {

	const handleClick = event => {
		event.preventDefault();
		return onNewProject();
	};

	return (
		<section className="jumbotron text-center">
			<div className="container">
				<h1 className="jumbotron-heading mb-5">Start prototyping with a</h1>
				<p>
					<a className="btn btn-primary btn-lg" onClick={handleClick} href="#">New Project</a>
				</p>
				{hasProjects && <p>or</p>}
			</div>
		</section>
	);
};

NewProject.propTypes = {
	onNewProject: PropTypes.func,
	hasProjects: PropTypes.bool
};
