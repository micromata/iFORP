import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './View.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibraryFilter from '../../components/Library/LibraryFilter';
import LibraryTreeView from '../../components/Library/LibraryTreeView';
import LibraryLinkEditor from '../../components/Library/LibraryLinkEditor';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import LibraryZipUpload from '../../components/Library/LibraryZipUpload';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import Button from '../../components/Button/Button';
import { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, usePageForView, saveLinksForView } from '../../actions/app-actions';
import { findProjectWithId, findWhiteboardWithId, findViewWithId, findPageWithId } from '../../utils';

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'html',
      selectedPageId: null,
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
    this.setState({ selectedFilter });
  }

  handleSelectPage = selectedPageId => {
    this.setState({ selectedPageId });
    this.props.getPageDetails(selectedPageId);
  }

  handleShowLibrarySelection = () => {
    this.setState({ librarySelectMode: true });
  }

  handleZipFileSelected = event => {
    const fileToUpload = event.target.files[0];
    event.target.value = null;
    this.props.uploadZipFile(fileToUpload);
  }

  handleSetLinkTarget = (interactionId, viewId) => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.links[interactionId] = viewId;
      return newState;
    });
  }

  handleUsePage = async () => {
    const page = findPageWithId(this.props.directories, this.state.selectedPageId) || {};
    const view = await this.props.usePageForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, page);
    const links = this.getLinksFromView(view);
    this.setState({ links,  librarySelectMode: false });
  }

  handleSaveLinksForView = async () => {
    await this.props.saveLinksForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, this.state.links);
    this.props.history.push(`/projects/${this.props.projectId}/whiteboards/${this.props.whiteboardId}`);
  }

  render() {
    const selectedPage = findPageWithId(this.props.directories, this.state.selectedPageId) || {};
    const showLibrary = this.state.librarySelectMode || !(this.props.view && this.props.view.hasFile);
    const previewData = showLibrary ?
      selectedPage :
      {
        htmlElementAttributes:  this.props.view.htmlElementAttributes,
        head: this.props.view.head,
        body: this.props.view.body,
        assets: this.props.view.assets,
        interactionElements: this.props.view.interactionElements
      };

    return (
      <div className={ this.props.classes.Library }>
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
              selectedPageId={ this.state.selectedPageId }
              onSelectPage={ this.handleSelectPage }
            />
          }

          <div className='content'>
            <HTMLPage
              htmlElementAttributes={ previewData.htmlElementAttributes || {} }
              head={ previewData.head || '' }
              body={ previewData.body || '' }
              assets={ previewData.assets || [] }
              viewportSize="desktop"
            />
          </div>

          { !showLibrary &&
            <LibraryLinkEditor
              availableInteractionElements={ previewData.interactionElements || [] }
              viewLinkOptions={ this.props.viewLinkOptions }
              links={ this.state.links }
              setLinkTarget={ this.handleSetLinkTarget }
            />
          }
        </main>
        <ProjectButtonBar includeNavigationMenu={ false }>
          { showLibrary &&
            <LibraryZipUpload onZipFileSelected={ this.handleZipFileSelected } />
          }
          { showLibrary &&
            <Button buttonStyle='round' onClick={ this.handleUsePage } disable={ !this.state.selectedPageId }>use</Button>
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

const actions = { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, usePageForView, saveLinksForView };

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.match.params.projectId);
  const whiteboardId = Number(ownProps.match.params.whiteboardId);
  const viewId = Number(ownProps.match.params.viewId);

  const project = findProjectWithId(state.app.projects, projectId);
  const whiteboard = findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const view = findViewWithId(state.app.projects, projectId, whiteboardId, viewId);

  const { directories } = state.app.library;
  const viewLinkOptions = (whiteboard && whiteboard.views) ?
    [{value: 0, title: '-'}].concat(whiteboard.views.map(view => ({ value: view.id, title: view.name }))):
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
