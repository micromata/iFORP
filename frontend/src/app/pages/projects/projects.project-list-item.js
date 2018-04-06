import React from 'react';
import {PropTypes} from 'prop-types';

export const ProjectListItem = ({project: {id, thumbnail, name}}) => (
	<a href={id}>
		<div className="card m-3">
			<img className="card-img-top rounded" src={thumbnail} alt="Card image cap" />
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
			</div>
		</div>
	</a>
);

ProjectListItem.propTypes = {
	project: PropTypes.object
};
