import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Preview.styles';
import NavBar from '../../components/NavBar/NavBar';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import ViewAnnotationPanel from '../../components/ViewAnnotation/ViewAnnotationPanel';
import Modal from '../../components/Modal/Modal';
import { getViewsForWhiteboard, getViewDetails, addAnnotationToView, changeViewAnnotationText, deleteViewAnnotation } from '../../actions/app-actions';
import { baseURL, findViewWithId, calculateImagePreviewOffset } from '../../utils';

export class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnnotationModeActive: false,
      deleteAnnotationId: null,
      viewportSize: 'desktop'
    };
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
    if (!viewLink || this.state.isAnnotationModeActive) return;

    this.props.history.push(`/projects/${this.props.projectId}/whiteboards/${this.props.whiteboardId}/views/${viewLink.toViewId}/preview`);
  };

  handleChangeViewportSize = viewportSize => {
    if (viewportSize === this.state.viewportSize) return;
    this.setState({ viewportSize, isAnnotationModeActive: false });
  }

  handleToggleAnnotationMode = () => {
    this.setState(prevState => ({ isAnnotationModeActive: !prevState.isAnnotationModeActive }));
  }

  handleAnnotate = coords => {
    if (!this.state.isAnnotationModeActive) return;
    this.props.addAnnotationToView(this.props.projectId, this.props.whiteboardId, this.props.viewId, this.state.viewportSize, coords.x, coords.y);
  }

  handleChangeAnnotationText = (annotationId, text) => {
    this.props.changeViewAnnotationText(this.props.projectId, this.props.whiteboardId, this.props.viewId, annotationId, text);
  }

  handleDeleteAnnotation = annotationId => {
    this.setState({ deleteAnnotationId: annotationId });
  }

  handleConfirmDeleteAnnotation = () => {
    this.props.deleteViewAnnotation(this.props.projectId, this.props.whiteboardId, this.props.viewId, this.state.deleteAnnotationId);
    this.setState({ deleteAnnotationId: null });
  }

  handleCancelDeleteAnnotation = () => {
    this.setState({ deleteAnnotationId: null });
  }

  getPreviewData = () => {
    if (!this.props.view) return {};

    if (this.props.view.fileType === 'html') {
      return {
        htmlElementAttributes:  this.props.view.htmlElementAttributes,
        head: this.props.view.head,
        body: this.props.view.body,
        assets: this.props.view.assets,
        interactionElements: this.props.view.interactionElements,
        annotations: this.props.view.annotations,
        fileType: this.props.view.fileType,
        horizontalOffset: 0
      }
    }

    return {
      htmlElementAttributes: { lang: 'en'},
      head: '<style>html, body { margin: 0; padding: 0; }</style>',
      body: `<div style='width: ${this.props.view.imageWidth}px; height: ${this.props.view.imageHeight}px; margin-left: auto; margin-right: auto; background-image: url(${baseURL}/library/images/${this.props.view.imageName});' />`,
      assets: [],
      fileType: this.props.view.fileType,
      interactionElements: this.props.view.imageInteractionElements,
      annotations: this.props.view.annotations,
      horizontalOffset: calculateImagePreviewOffset(this.state.viewportSize, this.props.view.imageWidth)
    };
  }

  render() {
    const previewData = this.getPreviewData();
    const annotations = previewData.annotations ?
      previewData.annotations.filter(annotation => annotation.viewportSize === this.state.viewportSize) :
      [];

    return (
      <React.Fragment>
        <div className={ this.props.classes.Preview }>
          <NavBar
            exit
            exitUrl={ `/projects/${ this.props.projectId }/whiteboards/${ this.props.whiteboardId}` }
            title='iFORP'
          />
          <main>
            <div className={`content ${this.state.isAnnotationModeActive ? 'WithAnnotations' : ''}`}>
              <HTMLPage
                htmlElementAttributes={ previewData.htmlElementAttributes || {} }
                head={ previewData.head || '' }
                body={ previewData.body || '' }
                assets={ previewData.assets || [] }
                isAnnotationModeActive={ this.state.isAnnotationModeActive }
                annotations={ annotations }
                imageInteractionElements={ previewData.fileType === 'image' ? previewData.interactionElements : [] }
                onInteractionElementClick={ this.handleInteractionElementClick }
                onAnnotate={ this.handleAnnotate }
                viewportSize={ this.state.viewportSize }
                horizontalOffset={ previewData.horizontalOffset }
              />
            </div>
          </main>
          <ViewAnnotationPanel
            annotations={ annotations }
            isAnnotationModeActive={ this.state.isAnnotationModeActive }
            currentViewportSize={ this.state.viewportSize }
            onChangeViewportSize={ this.handleChangeViewportSize }
            onToggleAnnotationMode={ this.handleToggleAnnotationMode }
            onChangeAnnotationText={ this.handleChangeAnnotationText }
            onDeleteAnnotation={ this.handleDeleteAnnotation }
          />
        </div>
        <Modal
          show={ this.state.deleteAnnotationId }
          headerText='Anmerkung löschen'
          bodyText={ 'Möchten Sie die Anmerkung wirklich löschen?' }
          labelCancel='Nein'
          labelConfirm='Ja'
          onCancel={ this.handleCancelDeleteAnnotation }
          onConfirm={ this.handleConfirmDeleteAnnotation }
        />
      </React.Fragment>
    );
  }
}

const actions = { getViewsForWhiteboard, getViewDetails, addAnnotationToView, changeViewAnnotationText, deleteViewAnnotation };

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.match.params.projectId);
  const whiteboardId = Number(ownProps.match.params.whiteboardId);
  const viewId = Number(ownProps.match.params.viewId);
  const view = findViewWithId(state.app.projects, projectId, whiteboardId, viewId);
  const annotations = (view && view.annotations) ?
    [...view.annotations].sort((a, b) => a.id - b.id) :
    [];

  return {
    projectId,
    whiteboardId,
    viewId,
    view,
    annotations
  }
};

const PreviewContainerWithStyles = injectSheet(styles)(Preview);
export default connect(mapStateToProps, actions)(PreviewContainerWithStyles);
