import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Whiteboard.styles';
import NavBar from '../../components/NavBar/NavBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import EditableText from '../../components/EditableText/EditableText';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import TileViewHtmlIcon from '../../assets/img/TileViewHtml';
import TileViewImageIcon from '../../assets/img/TileViewImage';
import CircleButton from '../../components/Button/CircleButton';
import PreviewIcon from '../../assets/img/Preview';
import PlusIcon from '../../assets/img/Plus';
import { getViewsForWhiteboard, createNewView, renameView, deleteView } from '../../actions/app-actions';
import { findProjectWithId, findWhiteboardWithId } from '../../utils';

class Whiteboard extends Component {
  componentDidMount = () => {
    this.props.getViewsForWhiteboard(this.props.projectId, this.props.whiteboardId);
  }

  handleCreateViewClick = () => {
    this.props.createNewView(this.props.projectId, this.props.whiteboardId);
  }

  navigateToView = viewId => {
    this.props.history.push(`/projects/${this.props.project.id}/whiteboards/${this.props.whiteboardId}/views/${viewId}`);
  }

  handleStartPreview = () => {
    const viewId = this.props.views[0].id;
    this.props.history.push(`/projects/${this.props.project.id}/whiteboards/${this.props.whiteboardId}/views/${viewId}/preview`);
  }

  handleDeleteViewClick = viewId => {
    this.props.deleteView(this.props.projectId, this.props.whiteboardId, viewId);
  }

  render() {
    if (!this.props.views) return null;

    const getIconForView = view => {
      switch (view.fileType) {
        case 'html':
          return TileViewHtmlIcon;
        case 'image':
          return TileViewImageIcon;
        default:
          return null;
      }
    };

    return (
      <React.Fragment>
        <NavBar
          exit
          exitUrl={ `/projects/${ this.props.projectId }` }
          title={ `iFORP > ${ this.props.project.name } > ${ this.props.whiteboard.name }` }
        />
        <div className={this.props.classes.Whiteboard}>
          <ElementGrid>
            { this.props.views.map(view =>
              <ButtonTile
                key={ view.id }
                titleBelow
                TileIcon={ getIconForView(view) }
                onClick={ () => this.navigateToView(view.id) }
                onDeleteClick={() => this.handleDeleteViewClick(view.id)}>
                <EditableText
                  text={ view.name }
                  onEditingConfirmed={ newName => this.props.renameView(this.props.projectId, this.props.whiteboardId, view.id, newName) }
                />
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar entries={ this.props.navigationMenuEntries }>
          <CircleButton onClick={ this.handleStartPreview } disabled={ !(this.props.views && this.props.views.length) }>
            <PreviewIcon />
          </CircleButton>
          <CircleButton onClick={ this.handleCreateViewClick }>
            <PlusIcon />
          </CircleButton>
        </ProjectButtonBar>
      </React.Fragment>
    );
  }
}

const actions = { getViewsForWhiteboard, createNewView, renameView, deleteView };

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.projectId, 10);
  const whiteboardId = parseInt(ownProps.match.params.whiteboardId, 10);
  const project = findProjectWithId(state.app.projects, projectId);
  const whiteboard = findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const views = whiteboard && whiteboard.views;

  const whiteboardNavEntries = project.whiteboards.
    filter(item => item.id !== whiteboardId).
    map(item => ({ title: item.name, url: `/projects/${projectId}/whiteboards/${item.id}` }));

  return {
    projectId,
    whiteboardId,
    project,
    whiteboard,
    views,
    navigationMenuEntries: [
      { title: 'Home', url: '/'},
      { title: 'Bibliothek', url: '/library'},
      { title: 'Projektübersicht', url: '/projects'},
      ...whiteboardNavEntries
    ]
  }
};

const WhiteboardContainerWithStyles = injectSheet(styles)(Whiteboard);
export default connect(mapStateToProps, actions)(WhiteboardContainerWithStyles);
