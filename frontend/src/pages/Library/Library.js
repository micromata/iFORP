import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Library.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibraryFilter from '../../components/Library/LibraryFilter';
import LibraryTreeView from '../../components/Library/LibraryTreeView';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import LibraryZipUpload from '../../components/Library/LibraryZipUpload';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import Button from '../../components/Button/Button';
import CircleButton from '../../components/Button/CircleButton';
import PlusIcon from '../../assets/img/Plus';
import { getLibraryDirectories, getPageDetails, uploadZipFile } from '../../actions/app-actions';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedFilter: 'html', selectedPageId: null };
  }

  componentDidMount() {
    this.props.getLibraryDirectories();
  }

  handleFilterChange = selectedFilter => {
    this.setState({ selectedFilter });
  }

  handleSelectPage = selectedPageId => {
    this.setState({ selectedPageId });
    this.props.getPageDetails(selectedPageId);
  }

  handleZipFileSelected = event => {
    const fileToUpload = event.target.files[0];
    event.target.value = null;
    this.props.uploadZipFile(fileToUpload);
  }

  render() {
    const selectedPage = this.state.selectedPageId && this.props.directories.reduce((pageWithId, directory) => {
      return pageWithId || directory.pages.find(page => page.id === this.state.selectedPageId);
    }, null) || {};

    // Const hasSelectedPageDetails = selectedPage && selectedPage.hasOwnProperty('body'); // eslint-disable-line no-prototype-builtins

    return (
      <div className={ this.props.classes.Library }>
        <NavBar title={ `iFORP > Bibliothek` } />
        <LibraryFilter selectedFilter={ this.state.selectedFilter } onFilterChange={ this.handleFilterChange } />
        <main>
          <LibraryTreeView
            directories={ this.props.directories }
            selectedPageId={ this.state.selectedPageId }
            onSelectPage={ this.handleSelectPage }
          />

          <div className='content'>
            <HTMLPage
              htmlElementAttributes={ selectedPage.htmlElementAttributes || {} }
              head={ selectedPage.head || '' }
              body={ selectedPage.body || '' }
              assets={ selectedPage.assets || [] }
              viewportSize="desktop"
            />
          </div>
        </main>
        <ProjectButtonBar includeNavigationMenu={ !this.props.isViewSpecific }>
          <LibraryZipUpload onZipFileSelected={ this.handleZipFileSelected } />
          { this.props.isViewSpecific &&
            <Button buttonStyle='round'>use</Button>
          }
        </ProjectButtonBar>
      </div>
    );
  }
}

const actions = { getLibraryDirectories, getPageDetails, uploadZipFile };

const mapStateToProps = (state, ownProps) => {
  /* eslint-disable no-prototype-builtins */
  const projectId = ownProps.match.params.hasOwnProperty('projectId') ? parseInt(ownProps.match.params.projectId, 10) : null;
  const whiteboardId = ownProps.match.params.hasOwnProperty('whiteboardId') ? parseInt(ownProps.match.params.whiteboardId, 10) : null;
  const viewId = ownProps.match.params.hasOwnProperty('viewId') ? parseInt(ownProps.match.params.viewId, 10) : null;
  /* eslint-enable no-prototype-builtins */

  const { directories } = state.app.library;

  return {
    projectId,
    whiteboardId,
    viewId,
    isViewSpecific: Boolean(projectId && whiteboardId && viewId),
    directories
  }
};

const LibraryContainerWithStyles = injectSheet(styles)(Library);
export default connect(mapStateToProps, actions)(LibraryContainerWithStyles);
