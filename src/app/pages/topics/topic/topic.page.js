import React from 'react';
import PropTypes from 'prop-types';

export const Topic = ({match}) => (
	<div className="p-4">
		<p>{match.params.topicId}</p>
	</div>
);

Topic.propTypes = {
	match: PropTypes.object
};
