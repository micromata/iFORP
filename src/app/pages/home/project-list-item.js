import React from 'react';
import PropTypes from 'prop-types';

export const ProjectListItem = ({index, project}) => (
	<div className={`col-md-3 ${index === 0 && 'offset-md-1'}`}>
		<a href="#">
			<div className="card m-2">
				<img className="card-img-top rounded" src="http://via.placeholder.com/200x150" alt="Card image cap" />
				<div className="card-body">
					<h5 className="card-title">{project.name}</h5>
				</div>
			</div>
		</a>
	</div>
);

ProjectListItem.propTypes = {
	project: PropTypes.object,
	index: PropTypes.number
};
