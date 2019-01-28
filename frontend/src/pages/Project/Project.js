import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Project.styles';
import NavBar from '../../components/NavBar/NavBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import { createNewWhiteboard, deleteWhiteboard } from '../../actions/app-actions';
import { findProjectWithId } from '../../utils';

class Project extends Component {
  handleCreateWhiteboadClick = () => {
    this.props.createNewWhiteboard(this.props.project.id);
  }

  handleDeleteWhiteboardClick = whiteboardId => {
    this.props.deleteWhiteboard(this.props.project.id, whiteboardId);
  }

  navigateToWhiteboard = whiteboardId => {
    this.props.history.push(`/projects/${this.props.project.id}/${whiteboardId}`);
  }

  render() {
    if (!this.props.project) return null;

    return (
      <React.Fragment>
        <NavBar exit title={ `iFORP > ${ this.props.project.name }` } />
        <div className={this.props.classes.Project}>
          <ElementGrid>
            { this.props.project.whiteboards.map(whiteboard =>
              <ButtonTile
                key={ whiteboard.id }
                titleBelow
                onClick={ () => this.navigateToWhiteboard(whiteboard.id) }
                onDeleteClick={() => this.handleDeleteWhiteboardClick(whiteboard.id)}>
                { whiteboard.name }
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar onPlusButtonClick={this.handleCreateWhiteboadClick} />
      </React.Fragment>
    );
  }
}

const actions = { createNewWhiteboard, deleteWhiteboard };

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.id, 10);
  return {
    project: findProjectWithId(state.app.projects, projectId)
  }
};

const ProjectContainerWithStyles = injectSheet(styles)(Project);
export default connect(mapStateToProps, actions)(ProjectContainerWithStyles);
