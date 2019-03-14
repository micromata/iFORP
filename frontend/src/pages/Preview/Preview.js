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
      annotationIdToShow: null,
      newAnnotation: null,
      deleteAnnotationId: null,
      viewportSize: 'desktop',
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
    this.setState({
      viewportSize,
      isAnnotationModeActive: false,
      annotationIdToShow: null
    });
  }

  handleToggleAnnotationMode = () => {
    this.setState(prevState => ({
      isAnnotationModeActive: !prevState.isAnnotationModeActive,
      annotationIdToShow: null
    }));
  }

  handleAnnotate = coords => {
    if (!this.state.isAnnotationModeActive) return;
    const newAnnotation = {
      id: '*',
      text: '',
      author: '',
      x: coords.x,
      y: coords.y,
      isoDate: (new Date()).toISOString(),
      isNewAnnotation: true
    };

    this.setState({newAnnotation, annotationIdToShow: '*'});
  }

  handleSaveNewAnnotation = async ({ author, text }) => {
    if (!this.state.isAnnotationModeActive) return;

    const annotation = {
      text,
      author,
      x: this.state.newAnnotation.x,
      y: this.state.newAnnotation.y,
      isoDate: this.state.newAnnotation.isoDate,
      viewportSize: this.state.viewportSize
    };

    const savedAnnotation = await this.props.addAnnotationToView(this.props.projectId, this.props.whiteboardId, this.props.viewId, annotation);
    this.setState({ newAnnotation: null, annotationIdToShow: savedAnnotation.id });
  }

  handleCancelAnnotate = () => {
    this.setState({
      newAnnotation: null,
      annotationToShow: null
    });
  }

  handleChangeAnnotationText = (annotationId, text) => {
    this.props.changeViewAnnotationText(this.props.projectId, this.props.whiteboardId, this.props.viewId, annotationId, text);
  }

  handleDeleteAnnotation = annotationId => {
    this.setState({ deleteAnnotationId: annotationId });
  }

  handleConfirmDeleteAnnotation = () => {
    this.props.deleteViewAnnotation(this.props.projectId, this.props.whiteboardId, this.props.viewId, this.state.deleteAnnotationId);
    this.setState({
      deleteAnnotationId: null,
      annotationIdToShow: null
    });
  }

  handleSelectAnnotation = annotationId => {
    this.setState({ annotationIdToShow: annotationId, newAnnotation: null });
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
        annotations: this.props.annotations,
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
      annotations: this.props.annotations,
      horizontalOffset: calculateImagePreviewOffset(this.state.viewportSize, this.props.view.imageWidth)
    };
  }

  render() {
    const previewData = this.getPreviewData();
    const annotations = previewData.annotations ?
      previewData.annotations
        .filter(annotation => annotation.viewportSize === this.state.viewportSize)
        .map((annotation, index) => ({...annotation, index: index+1})) :
      [];
    if (this.state.newAnnotation) {
      annotations.push(this.state.newAnnotation);
    }

    const annotationToShow = annotations.find(a => a.id === this.state.annotationIdToShow);

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
                onSelectAnnotation={ this.handleSelectAnnotation }
                viewportSize={ this.state.viewportSize }
                horizontalOffset={ previewData.horizontalOffset }
              />
            </div>
          </main>
          <ViewAnnotationPanel
            annotations={ annotations }
            isAnnotationModeActive={ this.state.isAnnotationModeActive }
            annotationToShow={ annotationToShow }
            currentViewportSize={ this.state.viewportSize }
            onChangeViewportSize={ this.handleChangeViewportSize }
            onToggleAnnotationMode={ this.handleToggleAnnotationMode }
            onChangeAnnotationText={ this.handleChangeAnnotationText }
            onDeleteAnnotation={ this.handleDeleteAnnotation }
            onCreateAnnotation={ this.handleSaveNewAnnotation }
            onCancelAnnotate={ this.handleCancelAnnotate }
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
    [...view.annotations]
      .map(a => ({...a, formattedDate: (new Date(a.isoDate)).toLocaleString('de') }))
      .sort((a, b) => a.id - b.id) :
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
