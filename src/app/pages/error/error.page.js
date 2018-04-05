import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({code, message}) => (
	<h2>
		{code} – {message}
	</h2>
);

Error.propTypes = {
	code: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired
};
