import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

export const ShowFox = (props) => (
	<React.Fragment>
		<figure>
			<img src={props.image} alt="" />
			<figcaption><a href={props.link}>Quelle</a></figcaption>
		</figure>
		<Button color="primary" onClick={props.update}>Get a another one</Button>
	</React.Fragment>
);

ShowFox.propTypes = {
	image: PropTypes.string,
	link: PropTypes.string,
	update: PropTypes.func
};
