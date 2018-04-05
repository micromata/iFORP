import React from 'react';
import PropTypes from 'prop-types';

export const FormatJson = ({json}) => (
	<pre className="pre-scrollable bg-light p-3">
		<code>{JSON.stringify(json, null, 2)}</code>
	</pre>
);

FormatJson.propTypes = {
	json: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	])
};
