import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({code, message}) => (
	<h1>
		{code} – {message}
	</h1>
);

Error.propTypes = {
	code: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired
};
