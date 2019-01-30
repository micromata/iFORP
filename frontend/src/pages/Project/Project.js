import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Project.styles';
import NavBar from '../../components/NavBar/NavBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import EditableName from '../../components/EditableName/EditableName';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import CircleButton from '../../components/Button/CircleButton';
import PlusIcon from '../../assets/img/Plus';
import { createNewWhiteboard, renameWhiteboard, deleteWhiteboard } from '../../actions/app-actions';
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
                <EditableName
                  name={ whiteboard.name }
                  onEditingConfirmed={ newName => this.props.renameWhiteboard(this.props.project.id, whiteboard.id, newName) }
                />
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar entries={ this.props.navigationMenuEntries }>
          <div />
          <CircleButton onClick={ this.handleCreateWhiteboadClick }>
            <PlusIcon />
          </CircleButton>
        </ProjectButtonBar>
      </React.Fragment>
    );
  }
}

const actions = { createNewWhiteboard, renameWhiteboard, deleteWhiteboard };

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.id, 10);

  const projectNavEntries = state.app.projects.
    map(item => ({ title: item.name, url: `/projects/${item.id}` }));

  return {
    project: findProjectWithId(state.app.projects, projectId),
    navigationMenuEntries: [
      { title: 'Home', url: '/'},
      { title: 'Bibliothek', url: '/library'},
      { title: 'Projektübersicht', url: '/projects'},
      ...projectNavEntries
    ]
  }
};

const ProjectContainerWithStyles = injectSheet(styles)(Project);
export default connect(mapStateToProps, actions)(ProjectContainerWithStyles);
