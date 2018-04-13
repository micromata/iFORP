import React from 'react';
import PropTypes from 'prop-types';

export const FormatJson = props => (
	<React.Fragment>
		{Object.keys(props).map(prop => (
			<React.Fragment key={prop}>
				<p className="bg-dark text-white p-0 px-3 mb-0 mt-3"><strong>{prop}:</strong> </p>
				<pre className="pre-scrollable bg-light p-3">
					<code>{JSON.stringify(props[prop], null, 2)}</code>
				</pre>
			</React.Fragment>
		))}
	</React.Fragment>
);

FormatJson.propTypes = {
	props: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
		PropTypes.number
	])
};
