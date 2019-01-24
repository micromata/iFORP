import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Project.styles';
import NavBar from '../../components/NavBar/NavBar';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import CircleButton from '../../components/Button/CircleButton';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import PlusIcon from '../../assets/img/Plus';
import ListIcon from '../../assets/img/List';
import { createNewWhiteboard, deleteWhiteboard } from '../../actions/app-actions';
import { findProjectWithId } from '../../utils';

class Project extends Component {
  componentWillMount() {
    console.log(this.props.match.params.id)
  }

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
        <ButtonBar>
          <div />
          <CircleButton onClick={ this.handleCreateWhiteboadClick }>
            <PlusIcon />
          </CircleButton>
          <CircleButton>
            <ListIcon />
          </CircleButton>
        </ButtonBar>
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
