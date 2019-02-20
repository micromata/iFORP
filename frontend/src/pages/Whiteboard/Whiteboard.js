import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Whiteboard.styles';
import config from '../../config';
import NavBar from '../../components/NavBar/NavBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import EditableText from '../../components/EditableText/EditableText';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import TileViewHtmlIcon from '../../assets/img/TileViewHtml';
import CircleButton from '../../components/Button/CircleButton';
import PreviewIcon from '../../assets/img/Preview';
import PlusIcon from '../../assets/img/Plus';
import { getViewsForWhiteboard, createNewView, renameView } from '../../actions/app-actions';
import { baseURL, findProjectWithId, findWhiteboardWithId } from '../../utils';

class Whiteboard extends Component {
  numberOfViews = { last: 0, current: 0 }

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

  hasConnectorToFollowingView = (viewId, index) => {
    if (!this.props.onlyLinearClickflow) return false;
    if (index === this.props.views.length - 1) return false;

    const followingView = this.props.views[index+1];
    return this.props.viewLinkMapping[viewId].toViews.includes(followingView.id);
  }

  componentDidUpdate() {
    if (this.numberOfViews.current > this.numberOfViews.last) {
      const lastView = [...this.props.views].pop();
      const node = document.querySelector(`#view-${lastView.id}`);
      if (!node) return;
      node.scrollIntoView();
    }
  }

  render() {
    if (!this.props.views) return null;

    const getIconForView = view => {
      switch (view.fileType) {
        case 'html':
          return TileViewHtmlIcon;
        default:
          return null;
      }
    };

    const getImagePathForView = view => {
      switch (view.fileType) {
        case 'image':
         return `${baseURL}/library/images/${view.imageName}`;
        default:
         return null;
      }
    }

    this.numberOfViews.last = this.numberOfViews.current;
    this.numberOfViews.current = this.props.views.length;

    return (
      <React.Fragment>
        <NavBar
          exit
          exitUrl={ `/projects/${ this.props.projectId }` }
          title={ `iFORP / ${ this.props.project.name } / ${ this.props.whiteboard.name }` }
        />
        <div className={this.props.classes.Whiteboard}>
          <ElementGrid nowrap>
            { this.props.views.map((view, index) =>
              <ButtonTile
                id={ `view-${view.id}` }
                key={ view.id }
                titleBelow
                TileIcon={ getIconForView(view) }
                TileImagePath={ getImagePathForView(view) }
                connectRight={ this.hasConnectorToFollowingView(view.id, index) }
                onClick={ () => this.navigateToView(view.id) }>
                <EditableText
                  text={ view.name }
                  onEditingConfirmed={ newName => this.props.renameView(this.props.projectId, this.props.whiteboardId, view.id, newName) }
                />
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar entries={ this.props.navigationMenuEntries }>
          <CircleButton onClick={ this.handleStartPreview } disabled={ !this.props.canStartPreview }>
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

const actions = { getViewsForWhiteboard, createNewView, renameView };

const getViewLinkMapping = views => {
  if (!views || !views.length) return {};

  const ensureMappingForViewExists = (mapping, viewId) => {
    if (!mapping[viewId]) {
      mapping[viewId] = { fromViews: [], toViews: [] };
    }
  }

  return views.reduce((mapping, view) => {
    ensureMappingForViewExists(mapping, view.id);

    if (!view.viewLinks || !view.viewLinks.length) return mapping;

    view.viewLinks.forEach(link => {
      ensureMappingForViewExists(mapping, link.toViewId);
      mapping[view.id].toViews.push(link.toViewId);
      mapping[link.toViewId].fromViews.push(view.id);
    });

    return mapping;
  }, {});
}

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.projectId, 10);
  const whiteboardId = parseInt(ownProps.match.params.whiteboardId, 10);
  const project = findProjectWithId(state.app.projects, projectId);
  const whiteboard = findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const views = whiteboard && whiteboard.views;

  const viewLinkMapping = getViewLinkMapping(views);

  const whiteboardNavEntries = project.whiteboards.
    filter(item => item.id !== whiteboardId).
    map(item => ({ title: item.name, url: `/projects/${projectId}/whiteboards/${item.id}` }));

  const canStartPreview = views && views.length && views.every(view => view.hasFile);

  return {
    projectId,
    whiteboardId,
    project,
    whiteboard,
    views,
    viewLinkMapping,
    canStartPreview,
    onlyLinearClickflow: config.whiteboardClickflow === 'linear',
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
