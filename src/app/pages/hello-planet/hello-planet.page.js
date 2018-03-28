import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

export const HelloPlanet = (props) => (
	<React.Fragment>
		<p>Hello {props.planet || 'World'}!</p>
		<Button color="primary">Okay</Button>
	</React.Fragment>
);

HelloPlanet.propTypes = {
	planet: PropTypes.string
};
