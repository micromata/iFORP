import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Library.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibraryFilter from '../../components/Library/LibraryFilter';
import LibraryTreeView from '../../components/Library/LibraryTreeView';
import LibraryLinkEditor from '../../components/Library/LibraryLinkEditor';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import LibraryZipUpload from '../../components/Library/LibraryZipUpload';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import Button from '../../components/Button/Button';
import { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, usePageForView, saveLinksForView } from '../../actions/app-actions';
import { findWhiteboardWithId, findViewWithId, findPageWithId } from '../../utils';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'html',
      selectedPageId: null,
      usedPageId: null,
      links: {}
    };
  }

  async componentDidMount() {
    await this.props.getLibraryDirectories();

    if (this.props.isViewSpecific) {
      await this.props.getViewsForWhiteboard(this.props.projectId, this.props.whiteboardId);
      await this.props.getViewDetails(this.props.projectId, this.props.whiteboardId, this.props.viewId);
    }
  }

  handleFilterChange = selectedFilter => {
    this.setState({ selectedFilter });
  }

  handleSelectPage = selectedPageId => {
    this.setState({ selectedPageId });
    this.props.getPageDetails(selectedPageId);
  }

  handleCancelLinkEditing = () => {
    this.setState({ usedPageId: null });
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
    await this.props.usePageForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, page);
    this.setState({ usedPageId: page.id });
  }

  handleSaveLinksForView = () => {
    this.props.saveLinksForView(this.props.projectId, this.props.whiteboardId, this.props.viewId, this.state.links);
  }

  render() {
    const selectedPage = findPageWithId(this.props.directories, this.state.selectedPageId) || {};

    return (
      <div className={ this.props.classes.Library }>
        <NavBar title={ `iFORP > Bibliothek` } />
        { !this.state.usedPageId &&
          <LibraryFilter selectedFilter={ this.state.selectedFilter } onFilterChange={ this.handleFilterChange } />
        }
        <main>
          { !this.state.usedPageId &&
            <LibraryTreeView
              directories={ this.props.directories }
              selectedPageId={ this.state.selectedPageId }
              onSelectPage={ this.handleSelectPage }
            />
          }

          <div className='content'>
            <HTMLPage
              htmlElementAttributes={ selectedPage.htmlElementAttributes || {} }
              head={ selectedPage.head || '' }
              body={ selectedPage.body || '' }
              assets={ selectedPage.assets || [] }
              viewportSize="desktop"
            />
          </div>

          { this.state.usedPageId &&
            <LibraryLinkEditor
              availableInteractionElements={ selectedPage.interactionElements || [] }
              viewLinkOptions={ this.props.viewLinkOptions }
              links={ this.state.links }
              setLinkTarget={ this.handleSetLinkTarget }
            />
          }
        </main>
        <ProjectButtonBar includeNavigationMenu={ !this.props.isViewSpecific }>
          { !this.state.usedPageId &&
            <LibraryZipUpload onZipFileSelected={ this.handleZipFileSelected } />
          }
          { this.props.isViewSpecific && !this.state.usedPageId &&
            <Button buttonStyle='round' onClick={ this.handleUsePage } disable={ !this.state.selectedPageId }>use</Button>
          }
          { this.props.isViewSpecific && this.state.usedPageId &&
            <React.Fragment>
              <Button buttonStyle='round' onClick={ this.handleCancelLinkEditing }>cancel</Button>
              <Button buttonStyle='round' onClick={ this.handleSaveLinksForView }>save</Button>
            </React.Fragment>
          }
        </ProjectButtonBar>
      </div>
    );
  }
}

const actions = { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, usePageForView, saveLinksForView };

const mapStateToProps = (state, ownProps) => {
  /* eslint-disable no-prototype-builtins */
  const projectId = ownProps.match.params.hasOwnProperty('projectId') ? parseInt(ownProps.match.params.projectId, 10) : null;
  const whiteboardId = ownProps.match.params.hasOwnProperty('whiteboardId') ? parseInt(ownProps.match.params.whiteboardId, 10) : null;
  const viewId = ownProps.match.params.hasOwnProperty('viewId') ? parseInt(ownProps.match.params.viewId, 10) : null;
  /* eslint-enable no-prototype-builtins */

  const isViewSpecific = Boolean(projectId && whiteboardId && viewId);
  const whiteboard = isViewSpecific && findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const view = isViewSpecific && findViewWithId(state.app.projects, projectId, whiteboardId, viewId);


  const { directories } = state.app.library;
  const viewLinkOptions = (whiteboard && whiteboard.views) ?
    [{value: 0, title: '-'}].concat(whiteboard.views.map(view => ({ value: view.id, title: view.name }))):
    [];


  return {
    projectId,
    whiteboardId,
    viewId,
    isViewSpecific,
    directories,
    view,
    viewLinkOptions
  }
};

const LibraryContainerWithStyles = injectSheet(styles)(Library);
export default connect(mapStateToProps, actions)(LibraryContainerWithStyles);
