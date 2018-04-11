import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

export const ProjectListItem = ({project: {id, thumbnail, name}}) => (
	<Link to={`/whiteboards/project-id/${id}`}>
		<div className="card m-3">
			<img className="card-img-top rounded" src={thumbnail} alt="Card image cap" />
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
			</div>
		</div>
	</Link>
);

ProjectListItem.propTypes = {
	project: PropTypes.object
};
