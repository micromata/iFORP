import React from 'react';
import {PropTypes} from 'prop-types';

export const Content = ({content}) => (

	<React.Fragment>
		<div>{content}</div>
		<div className="row">
			<div className="col-12">
				<div className="preview-wrapper">
					<iframe
						src="https://michael-kuehnel.de"
						frameBorder="0"
						className="preview-container"
					></iframe>
				</div>
			</div>
		</div>
	</React.Fragment>
);

Content.propTypes = {
	content: PropTypes.string
};
