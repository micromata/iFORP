import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { FormatJson } from '../../shared/format-json';
import { ProjectListItem } from './home.project-list-item';

export const ProjectList = ({ projects }) => {
  const amountOfProjectsToShow = 3;

  return (
    <React.Fragment>
      <div className="row justify-content-md-center text-center">
        {projects
          .filter((project, index) => index < amountOfProjectsToShow)
          .map((project, index) => (
            <ProjectListItem index={index} key={project.id} project={project} />
          ))}
        <div className="col-md-1 align-self-center">
          <Link className="btn btn-secondary" to="/projects">
            <span className="oi oi-ellipses" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array
};
