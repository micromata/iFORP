import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './View.styles';
import config from '../../config';
import NavBar from '../../components/NavBar/NavBar';
import LibrarySidebar from '../../components/Library/LibrarySidebar';
import ViewLinkEditor from '../../components/ViewLinkEditor/ViewLinkEditor';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import LibraryZipUpload from '../../components/Library/LibraryZipUpload';
import LibraryImagesUpload from '../../components/Library/LibraryImagesUpload';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import Button from '../../components/Button/Button';
import CircleButton from '../../components/Button/CircleButton';
import Modal from '../../components/Modal/Modal';
import DeleteIcon from '../../assets/img/Delete';
import {
  deleteImageInteractionElement,
  deleteView,
  getLibraryDirectories,
  getViewsForWhiteboard,
  getViewDetails,
  getPageDetails,
  uploadImages,
  uploadZipFile,
  useImageForView,
  usePageForView,
  saveLinksForView,
  addInteractionElementToView
} from '../../actions/app-actions';
import {
  baseURL,
  findProjectWithId,
  findWhiteboardWithId,
  findViewWithId,
  findPageWithId,
  findImageWithId,
  calculateImagePreviewOffset
} from '../../utils';

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItemType: null,
      selectedDirectoryItemId: null,
      usedPageId: null,
      links: {},
      librarySelectMode: false,
      deleteImageInteractionElementId: null
    };
  }

  async componentDidMount() {
    await this.props.getLibraryDirectories();
    await this.props.getViewsForWhiteboard(this.props.projectId, this.props.whiteboardId);
    const viewDetails = await this.props.getViewDetails(this.props.projectId, this.props.whiteboardId, this.props.viewId);
    const links = this.getLinksFromView(viewDetails);
    this.setState({ links });
  }

  getLinksFromView = view => {
    if (!view || !view.viewLinks) return {};

    return view.viewLinks.reduce((acc, link) => {
      acc[link.interactionId] = link.toViewId;
      return acc;
    }, {});
  }

  handleSelectDirectoryItem = (selectedItemType, selectedDirectoryItemId) => {
    this.setState({selectedItemType, selectedDirectoryItemId });
  }

  handleShowLibrarySelection = () => {
    this.setState({ librarySelectMode: true });
  }

  handleSetLinkTarget = (interactionId, viewId) => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.links = this.props.onlyLinearClickflow ? {} : newState.links;
      newState.links[interactionId] = viewId;
      return newState;
    });
  }

  handleDeleteViewClick = () => {
    this.setState({ deleteViewId: this.props.viewId });
  }

  handleConfirmDeleteView = async () => {
    await this.props.deleteView(this.props.projectId, this.props.whiteboardId, this.state.deleteViewId);
    this.props.history.push(`/projects/${this.props.projectId}/whiteboards/${this.props.whiteboardId}`);
  }

  handleCancelDeleteView = () => {
    this.setState({ deleteViewId: null });
  }

  handleDeleteImageInteractionElement = interactionId => {
    this.setState({ deleteImageInteractionElementId: interactionId });
  }

  handleConfirmDeleteImageInteractionElement = () => {
    this.props.deleteImageInteractionElement(this.props.projectId, this.props.whiteboardId, this.props.viewId, this.state.deleteImageInteractionElementId);
    this.setState({ deleteImageInteractionElementId: null });
  }

  handleCancelDeleteImageInteractionElement = () => {
    this.setState({ deleteImageInteractionElementId: null });
  }

  handleUseDirectoryItem = async () => {
    let view;
    if (this.state.selectedItemType === 'html') {
      const page = findPageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};
      view = await this.props.usePageForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, page);
    }
    else if (this.state.selectedItemType === 'image') {
      const image = findImageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};
      view = await this.props.useImageForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, image);
    } else {
      return;
    }

    if (this.props.onlyLinearClickflow && this.props.viewLinkOptions.length <= 1) {
      return this.props.history.push(`/projects/${this.props.projectId}/whiteboards/${this.props.whiteboardId}`);
    }

    const links = this.getLinksFromView(view);
    this.setState({ links,  librarySelectMode: false });
  }

  handleSaveLinksForView = async () => {
    await this.props.saveLinksForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, this.state.links);
    this.props.history.push(`/projects/${this.props.projectId}/whiteboards/${this.props.whiteboardId}`);
  }

  getPreviewData = showLibrary => {
    if (showLibrary) {
      if (this.state.selectedItemType === 'html') {
        return findPageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};
      }

      const image = findImageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};

      return {
        htmlElementAttributes: { lang: 'en'},
        head: '<style>html, body { margin: 0; padding: 0; }</style>',
        body: `<div style='width: ${image.width}px; height: ${image.height}px; margin-left: auto; margin-right: auto; background-image: url(${baseURL}/library/images/${image.name});' />`,
        assets: [],
        interactionElements: [],
        fileType: 'image',
        horizontalOffset: calculateImagePreviewOffset('desktop', image.width)
      };
    }

    if (this.props.view.fileType === 'html') {
      return {
        htmlElementAttributes:  this.props.view.htmlElementAttributes,
        head: this.props.view.head,
        body: this.props.view.body,
        assets: this.props.view.assets,
        interactionElements: this.props.view.interactionElements,
        fileType: this.props.view.fileType,
        horizontalOffset: 0
      }
    }

    return {
      htmlElementAttributes: { lang: 'en'},
      head: '<style>html, body { margin: 0; padding: 0; }</style>',
      body: `<div style='width: ${this.props.view.imageWidth}px; height: ${this.props.view.imageHeight}px; margin-left: auto; margin-right: auto; background-image: url(${baseURL}/library/images/${this.props.view.imageName});' />`,
      assets: [],
      interactionElements: [...this.props.view.imageInteractionElements].sort((a, b) => a.id - b.id),
      fileType: this.props.view.fileType,
      horizontalOffset: calculateImagePreviewOffset('desktop', this.props.view.imageWidth)
    };
  }

  render() {
    const showLibrary = this.state.librarySelectMode || !(this.props.view && this.props.view.hasFile);

    const previewData = this.getPreviewData(showLibrary);

    return (
      <div className={ this.props.classes.View }>
        <NavBar
          exit
          exitUrl={ `/projects/${ this.props.projectId }/whiteboards/${ this.props.whiteboardId}` }
          title='iFORP'
        />
        <main>
          { showLibrary &&
            <LibrarySidebar
              directories={ this.props.directories }
              selectedItemId={ this.state.selectedDirectoryItemId }
              onSelectItem={ this.handleSelectDirectoryItem }
              onZipFileSelected={ this.props.uploadZipFile }
              onImagesSelected={ this.props.uploadImages }
            />
          }

          { !showLibrary &&
            <ViewLinkEditor
              fileType={ previewData.fileType }
              availableInteractionElements={ previewData.interactionElements || [] }
              viewLinkOptions={ this.props.viewLinkOptions }
              links={ this.state.links }
              setLinkTarget={ this.handleSetLinkTarget }
              deleteImageInteractionElement={ this.handleDeleteImageInteractionElement }
            />
          }

          <div className='content'>
            <HTMLPage
              htmlElementAttributes={ previewData.htmlElementAttributes || {} }
              head={ previewData.head || '' }
              body={ previewData.body || '' }
              assets={ previewData.assets || [] }
              viewportSize="desktop"
              horizontalOffset={ previewData.horizontalOffset }
              allowInteractionElementCreation={ !showLibrary && previewData.fileType === 'image' }
              imageInteractionElements={ previewData.fileType === 'image' ? previewData.interactionElements : [] }
              onCreateInteractionElement={ coords => this.props.addInteractionElementToView(this.props.projectId, this.props.whiteboardId, this.props.view.id, coords) }
            />
          </div>
        </main>
        <ProjectButtonBar includeNavigationMenu={ false }>
          { showLibrary &&
            <React.Fragment>
              <div className='ButtonsLeft'>
                { Boolean(this.props.directories && this.props.directories.length) &&
                  <React.Fragment>
                    <LibraryZipUpload onZipFileSelected={ this.props.uploadZipFile } />
                    <LibraryImagesUpload onImagesSelected={ this.props.uploadImages } />
                  </React.Fragment>
                }
              </div>
              <div className='ButtonsCenter'>
                <CircleButton onClick={ this.handleDeleteViewClick } className='ghost' disabled={ !this.props.canDelete }>
                  <DeleteIcon color={ this.props.canDelete ? this.props.theme.Button.textColor : this.props.theme.Button.textColorDisabled } />
                </CircleButton>
              </div>
              <div className='ButtonsRight'>
                <Button buttonStyle='round' onClick={ this.handleUseDirectoryItem } disabled={ !this.state.selectedDirectoryItemId }>
                  Verwenden
                </Button>
              </div>
            </React.Fragment>
          }
          { !showLibrary &&
            <React.Fragment>
              <div className='ButtonsLeft'>
                <Button buttonStyle='round' className='ghost' onClick={ this.handleShowLibrarySelection }>Inhalt ersetzen</Button>
              </div>
              <div className='ButtonsCenter'>
                <CircleButton onClick={ this.handleDeleteViewClick } className='ghost' disabled={ !this.props.canDelete }>
                  <DeleteIcon color={ this.props.canDelete ? this.props.theme.Button.textColor : this.props.theme.Button.textColorDisabled } />
                </CircleButton>
              </div>
              <div className='ButtonsRight'>
                <Button buttonStyle='round' onClick={ this.handleSaveLinksForView }>Speichern</Button>
              </div>
            </React.Fragment>
          }
        </ProjectButtonBar>
        <Modal
          show={ this.state.deleteImageInteractionElementId }
          headerText='Interaktionselement löschen'
          bodyText={ 'Möchten Sie das Interaktionselement wirklich löschen?' }
          labelCancel='Nein'
          labelConfirm='Ja'
          onCancel={ this.handleCancelDeleteImageInteractionElement }
          onConfirm={ this.handleConfirmDeleteImageInteractionElement }
        />
        <Modal
          show={ this.state.deleteViewId }
          headerText='View löschen'
          bodyText={ 'Möchten Sie die View wirklich löschen?' }
          labelCancel='Nein'
          labelConfirm='Ja'
          onCancel={ this.handleCancelDeleteView }
          onConfirm={ this.handleConfirmDeleteView }
        />
      </div>
    );
  }
}

const actions = {
  getLibraryDirectories,
  getViewsForWhiteboard,
  getViewDetails,
  getPageDetails,
  uploadImages,
  uploadZipFile,
  useImageForView,
  usePageForView,
  saveLinksForView,
  addInteractionElementToView,
  deleteImageInteractionElement,
  deleteView
};

const getViewsToLinkTo = (viewId, whiteboard, onlyLinearClickflow) => {
  if (!whiteboard || !whiteboard.views) return [];

  const viewsSortedById = [...whiteboard.views].sort((a, b) => a.id - b.id);
  const mappedViews = viewsSortedById.map(view => ({ value: view.id, title: view.name }));

  if (onlyLinearClickflow) {
    const viewsBehind = mappedViews.filter(view => view.value > viewId);
    return viewsBehind.length ? [viewsBehind[0]] : [];
  }

  return mappedViews.filter(view => view.value !== viewId);
}

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.match.params.projectId);
  const whiteboardId = Number(ownProps.match.params.whiteboardId);
  const viewId = Number(ownProps.match.params.viewId);

  const project = findProjectWithId(state.app.projects, projectId);
  const whiteboard = findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const view = findViewWithId(state.app.projects, projectId, whiteboardId, viewId);

  const { directories } = state.app.library;

  const onlyLinearClickflow = config.whiteboardClickflow === 'linear';
  const viewsToLinkTo = getViewsToLinkTo(viewId, whiteboard, onlyLinearClickflow);
  const viewLinkOptions = (whiteboard && whiteboard.views) ?
    [{value: 0, title: 'Linkziel setzen '}].concat(viewsToLinkTo):
    [];


  return {
    projectId,
    whiteboardId,
    viewId,
    projectName: project.name,
    whiteboardName: whiteboard.name,
    directories,
    view,
    viewLinkOptions,
    onlyLinearClickflow,
    canDelete: !onlyLinearClickflow || viewsToLinkTo.length === 0
  }
};

const ViewContainerWithStyles = injectSheet(styles)(View);
export default connect(mapStateToProps, actions)(ViewContainerWithStyles);
