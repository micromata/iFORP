import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export const ProjectListItem = ({index, project: {id, name}}) => (
	<div className={`col-md-3 ${index === 0 && 'offset-md-1'}`}>
		<Link to={`/whiteboards/project/${id}`}>
			<div className="card m-2">
				<img className="card-img-top rounded template-thumb" src="../../assets/img/thumnail.png" alt="Card image cap" />
				<div className="card-body">
					<h5 className="card-title">{name}</h5>
				</div>
			</div>
		</Link>
	</div>
);

ProjectListItem.propTypes = {
	project: PropTypes.object,
	index: PropTypes.number
};
