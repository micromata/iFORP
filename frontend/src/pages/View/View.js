import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './View.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibraryFilter from '../../components/Library/LibraryFilter';
import LibraryTreeView from '../../components/Library/LibraryTreeView';
import ViewLinkEditor from '../../components/ViewLinkEditor/ViewLinkEditor';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import LibraryZipUpload from '../../components/Library/LibraryZipUpload';
import LibraryImagesUpload from '../../components/Library/LibraryImagesUpload';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import Button from '../../components/Button/Button';
import { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadImages, uploadZipFile, useImageForView, usePageForView, saveLinksForView, addInteractionElementToView } from '../../actions/app-actions';
import { baseURL, findProjectWithId, findWhiteboardWithId, findViewWithId, findPageWithId, findImageWithId } from '../../utils';

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'html',
      selectedDirectoryItemId: null,
      usedPageId: null,
      links: {},
      librarySelectMode: false
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

  handleFilterChange = selectedFilter => {
    this.setState({ selectedFilter, selectedDirectoryItemId: null });
  }

  handleSelectDirectoryItem = selectedDirectoryItemId => {
    this.setState({ selectedDirectoryItemId });

    if (this.state.selectedFilter === 'html') {
      this.props.getPageDetails(selectedDirectoryItemId);
    }
  }

  handleShowLibrarySelection = () => {
    this.setState({ librarySelectMode: true });
  }

  handleSetLinkTarget = (interactionId, viewId) => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.links[interactionId] = viewId;
      return newState;
    });
  }

  handleUseDirectoryItem = async () => {
    let view;
    if (this.state.selectedFilter === 'html') {
      const page = findPageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};
      view = await this.props.usePageForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, page);
    }
    else if (this.state.selectedFilter === 'image') {
      const image = findImageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};
      view = await this.props.useImageForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, image);
    } else {
      return;
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
      if (this.state.selectedFilter === 'html') {
        return findPageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};
      }

      const image = findImageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {};

      return {
        htmlElementAttributes: { lang: 'en'},
        head: '<style>html, body { margin: 0; padding: 0; }</style>',
        body: `<div style='width: ${image.width}px; height: ${image.height}px; background-image: url(${baseURL}/library/images/${image.name});' />`,
        assets: [],
        interactionElements: [],
        fileType: 'image'
      };
    }

    if (this.props.view.fileType === 'html') {
      return {
        htmlElementAttributes:  this.props.view.htmlElementAttributes,
        head: this.props.view.head,
        body: this.props.view.body,
        assets: this.props.view.assets,
        interactionElements: this.props.view.interactionElements,
        fileType: this.props.view.fileType
      }
    }

    return {
      htmlElementAttributes: { lang: 'en'},
      head: '<style>html, body { margin: 0; padding: 0; }</style>',
      body: `<div style='width: ${this.props.view.imageWidth}px; height: ${this.props.view.imageHeight}px; background-image: url(${baseURL}/library/images/${this.props.view.imageName});' />`,
      assets: [],
      interactionElements: [...this.props.view.imageInteractionElements].sort((a, b) => a.id - b.id),
      fileType: this.props.view.fileType
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
          title={ `iFORP > ${this.props.projectName} > ${this.props.whiteboardName} > ${this.props.view && this.props.view.name}` }
        />
        { showLibrary &&
          <LibraryFilter selectedFilter={ this.state.selectedFilter } onFilterChange={ this.handleFilterChange } />
        }
        <main>
          { showLibrary &&
            <LibraryTreeView
              directories={ this.props.directories }
              fileTypeFilter={ this.state.selectedFilter }
              onSelectItem={ this.handleSelectDirectoryItem }
            />
          }

          <div className='content'>
            <HTMLPage
              htmlElementAttributes={ previewData.htmlElementAttributes || {} }
              head={ previewData.head || '' }
              body={ previewData.body || '' }
              assets={ previewData.assets || [] }
              viewportSize="desktop"
              allowInteractionElementCreation={ !showLibrary && previewData.fileType === 'image' }
              interactionElements={ previewData.interactionElements }
              onCreateInteractionElement={ coords => this.props.addInteractionElementToView(this.props.projectId, this.props.whiteboardId, this.props.view.id, coords) }
            />
          </div>

          { !showLibrary &&
            <ViewLinkEditor
              fileType={ previewData.fileType }
              availableInteractionElements={ previewData.interactionElements || [] }
              viewLinkOptions={ this.props.viewLinkOptions }
              links={ this.state.links }
              setLinkTarget={ this.handleSetLinkTarget }
            />
          }
        </main>
        <ProjectButtonBar includeNavigationMenu={ false }>
          { showLibrary && this.state.selectedFilter === 'html' &&
              <LibraryZipUpload onZipFileSelected={ this.props.uploadZipFile } />
          }
          { showLibrary && this.state.selectedFilter === 'image' &&
            <LibraryImagesUpload onImagesSelected={ this.props.uploadImages } />
          }
          { showLibrary &&
            <Button buttonStyle='round' onClick={ this.handleUseDirectoryItem } disable={ !this.state.selectedDirectoryItemId }>use</Button>
          }
          { !showLibrary &&
            <React.Fragment>
              <Button buttonStyle='round' onClick={ this.handleShowLibrarySelection }>aus Bibliothek wählen</Button>
              <Button buttonStyle='round' onClick={ this.handleSaveLinksForView }>Speichern</Button>
            </React.Fragment>
          }
        </ProjectButtonBar>
      </div>
    );
  }
}

const actions = { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadImages, uploadZipFile, useImageForView, usePageForView, saveLinksForView, addInteractionElementToView};

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.match.params.projectId);
  const whiteboardId = Number(ownProps.match.params.whiteboardId);
  const viewId = Number(ownProps.match.params.viewId);

  const project = findProjectWithId(state.app.projects, projectId);
  const whiteboard = findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const view = findViewWithId(state.app.projects, projectId, whiteboardId, viewId);

  const { directories } = state.app.library;

  const viewsToLinkTo = (whiteboard && whiteboard.views) ?
    whiteboard.views.
      filter(view => view.id !== viewId).
      map(view => ({ value: view.id, title: view.name })) :
    [];

  const viewLinkOptions = (whiteboard && whiteboard.views) ?
    [{value: 0, title: '-'}].concat(viewsToLinkTo):
    [];


  return {
    projectId,
    whiteboardId,
    viewId,
    projectName: project.name,
    whiteboardName: whiteboard.name,
    directories,
    view,
    viewLinkOptions
  }
};

const ViewContainerWithStyles = injectSheet(styles)(View);
export default connect(mapStateToProps, actions)(ViewContainerWithStyles);
