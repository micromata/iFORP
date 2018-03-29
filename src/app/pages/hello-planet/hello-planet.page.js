import React from 'react';
import PropTypes from 'prop-types';

export const HelloPlanet = (props) => (
	<React.Fragment>
		<h2>Hello {props.planet || 'World'}!</h2>
	</React.Fragment>
);

HelloPlanet.propTypes = {
	planet: PropTypes.string
};
