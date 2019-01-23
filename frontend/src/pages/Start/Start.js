import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewProject } from '../../actions/app-actions';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import injectSheet from 'react-jss';
import styles from './Start.styles';
import Button from '../../components/Button/Button';
import Dots from '../../assets/img/Dots';

class Start extends Component {
  constructor(props) {
    super(props);

    this.createNewProject = this.createNewProject.bind(this);
  }

  navigateToProjectOverview = () => {
    this.props.history.push(`projects`);
  }

  navigateToProject = projectId => {
    this.props.history.push(`projects/${projectId}`);
  }

  createNewProject() {
    this.props.createNewProject(this.navigateToProject);
  }

  render() {
    const hasExistingProject = Boolean(this.props.projects && this.props.projects.length);

    return (
      <React.Fragment>
        <NavBar title="iFORP" />
        <div className={this.props.classes.Start}>
          <div className="newProjectText">
            <p>Start prototyping</p>
            <p>with a</p>
          </div>
          <div className="newProject">
            <Button onClick={this.createNewProject}>New Project</Button>
          </div>

          { hasExistingProject &&
            <React.Fragment>
              <div className="recentProjectText">
                <p>or</p>
                <p>choose a recent project</p>
              </div>
              <ElementGrid>
                { this.props.projects.map(project =>
                  <ButtonTile
                    key={ project.id }
                    titleBelow
                    onClick={ () => this.navigateToProject(project.id ) }>
                    { project.name }
                  </ButtonTile>
                )}
                <Button
                  className="ghost"
                  onClick={this.navigateToProjectOverview}
                  >
                  <Dots />
                </Button>
              </ElementGrid>
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.app.projects.slice(0, 3)
});

const actions = { createNewProject };

const StartContainerWithStyles = injectSheet(styles)(Start);
export default connect(mapStateToProps, actions)(StartContainerWithStyles);
