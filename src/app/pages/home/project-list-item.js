import React from 'react';
import PropTypes from 'prop-types';

export const ProjectListItem = ({project}) => (
	<li>{project.name}</li>
);

ProjectListItem.propTypes = {
	project: PropTypes.object
};
