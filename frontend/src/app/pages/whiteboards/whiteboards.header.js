import React from 'react';
import {PropTypes} from 'prop-types';

export const Header = ({project, currentWhiteboard, whiteboards}) => (
	<div className="row text-center mb-4">
		<div className="col-2 text-left align-self-center">
			<a href="start.html"><span className="oi oi-x"></span></a>
		</div>
		<div className="col-8">
			<h1 className="h2">{project.name} / {currentWhiteboard.name}</h1>
		</div>
		<div className="col-2 text-right align-self-center">
			<a href="start.html"><span className="oi oi-menu"></span></a>
		</div>
	</div>
);

Header.propTypes = {
	project: PropTypes.object,
	currentWhiteboard: PropTypes.object,
	whiteboards: PropTypes.array
};
