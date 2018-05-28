import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export const ProjectListItem = ({ project: { id, name } }) => (
  <Link to={`/whiteboards/project/${id}`}>
    <div className="card m-3">
      <img
        className="card-img-top rounded template-thumb"
        src="../../assets/img/thumnail.png"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  </Link>
);

ProjectListItem.propTypes = {
  project: PropTypes.object
};
