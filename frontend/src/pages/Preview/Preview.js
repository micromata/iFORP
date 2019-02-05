import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Preview.styles';
import NavBar from '../../components/NavBar/NavBar';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import Toggle from '../../components/Toggle/Toggle';
import { getViewsForWhiteboard, getViewDetails } from '../../actions/app-actions';
import { findViewWithId } from '../../utils';

export class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = { showAnnotations: false };
  }

  componentDidMount() {
    this.ensureViewDetailsAvailable()
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewId === prevProps.viewId) return;

    this.ensureViewDetailsAvailable();
  }

  ensureViewDetailsAvailable = async () => {
    await this.props.getViewsForWhiteboard(this.props.projectId, this.props.whiteboardId);
    await this.props.getViewDetails(this.props.projectId, this.props.whiteboardId, this.props.viewId);
  }

  handleInteractionElementClick = interactionId => {
    const viewLink = this.props.view.viewLinks.find(link => link.interactionId === interactionId);
    if (!viewLink || this.state.showAnnotations) return;

    this.props.history.push(`/projects/${this.props.projectId}/whiteboards/${this.props.whiteboardId}/views/${viewLink.toViewId}/preview`);
  };

  handleToggleAnnotations = showAnnotations => {
    this.setState({ showAnnotations })
  }

  render() {
    const previewData = this.props.view || {};

    return (
      <div className={ this.props.classes.Preview }>
        <NavBar
          exit
          exitUrl={ `/projects/${ this.props.projectId }/whiteboards/${ this.props.whiteboardId}` }
          title={ `iFORP > Preview` }
        />
        <main>
          <div className='content'>
            <HTMLPage
              htmlElementAttributes={ previewData.htmlElementAttributes || {} }
              head={ previewData.head || '' }
              body={ previewData.body || '' }
              assets={ previewData.assets || [] }
              onInteractionElementClick={ this.handleInteractionElementClick }
              viewportSize="desktop"
            />
            <div className='annotation-panel'>
              <h3>Annotations</h3>
              <Toggle
                labelLeft="Off"
                labelRight="On"
                textColorActive="#FFFFFF"
                isActive={this.state.showAnnotations}
                onToggle={this.handleToggleAnnotations}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const actions = { getViewsForWhiteboard, getViewDetails };

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.match.params.projectId);
  const whiteboardId = Number(ownProps.match.params.whiteboardId);
  const viewId = Number(ownProps.match.params.viewId);
  const view = findViewWithId(state.app.projects, projectId, whiteboardId, viewId);

  return {
    projectId,
    whiteboardId,
    viewId,
    view
  }
};

const PreviewContainerWithStyles = injectSheet(styles)(Preview);
export default connect(mapStateToProps, actions)(PreviewContainerWithStyles);
