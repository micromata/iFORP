import React from 'react';
import PropTypes from 'prop-types';

export const Topic = ({match}) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);

Topic.propTypes = {
	match: PropTypes.object
};
