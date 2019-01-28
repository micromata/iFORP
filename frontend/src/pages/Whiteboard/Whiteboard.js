import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Whiteboard.styles';
import NavBar from '../../components/NavBar/NavBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import { getViewsForWhiteboard, createNewView, deleteView } from '../../actions/app-actions';
import { findProjectWithId, findWhiteboardWithId } from '../../utils';

class Whiteboard extends Component {
  componentDidMount = () => {
    this.props.getViewsForWhiteboard(this.props.projectId, this.props.whiteboardId);
  }

  handleCreateViewClick = () => {
    this.props.createNewView(this.props.projectId, this.props.whiteboardId);
  }

  handleDeleteViewClick = viewId => {
    this.props.deleteView(this.props.projectId, this.props.whiteboardId, viewId);
  }

  render() {
    if (!this.props.views) return null;

    return (
      <React.Fragment>
        <NavBar title={ `iFORP > ${ this.props.project.name } > ${ this.props.whiteboard.name }` } />
        <div className={this.props.classes.Whiteboard}>
          <ElementGrid>
            { this.props.views.map(view =>
              <ButtonTile
                key={ view.id }
                onDeleteClick={() => this.handleDeleteViewClick(view.id)}
                titleBelow>
                { view.name }
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar onPlusButtonClick={this.handleCreateViewClick} />
      </React.Fragment>
    );
  }
}

const actions = { getViewsForWhiteboard, createNewView, deleteView };

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.projectId, 10);
  const whiteboardId = parseInt(ownProps.match.params.whiteboardId, 10);
  const project = findProjectWithId(state.app.projects, projectId);
  const whiteboard = findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const views = whiteboard && whiteboard.views;

  return {
    projectId,
    whiteboardId,
    project,
    whiteboard,
    views
  }
};

const WhiteboardContainerWithStyles = injectSheet(styles)(Whiteboard);
export default connect(mapStateToProps, actions)(WhiteboardContainerWithStyles);
