import React from 'react';
import { PropTypes } from 'prop-types';

import { http } from '../../base/http';
import { NewProject } from './home.new-project';
import { ProjectList } from './home.project-list';
import { FormatJson } from '../../shared/format-json'; // eslint-disable-line no-unused-vars

export class Home extends React.Component {
  state = {
    projects: []
  };

  handleNewProject = async () => {
    const newProject = await http.post('projects');
    this.props.history.push(
      `/whiteboards/project/${newProject.id}/whiteboard/${
        newProject.whiteboards.pop().id
      }`
    );
  };

  async componentDidMount() {
    const projects = await http.get('projects');
    this.setState({ projects });
  }

  render() {
    return (
      <main id="start" className="container">
        <NewProject
          onNewProject={this.handleNewProject}
          hasProjects={this.state.projects.length > 0}
        />
        {this.state.projects.length ? (
          <ProjectList projects={this.state.projects} />
        ) : null}
        {/* <FormatJson json={this.state} /> */}
      </main>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object
};
