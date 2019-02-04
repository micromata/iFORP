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
import { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, usePageForView, saveLinksForView } from '../../actions/app-actions';
import { findPageWithId } from '../../utils';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'html',
      selectedPageId: null
    };
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

  render() {
    const selectedPage = findPageWithId(this.props.directories, this.state.selectedPageId) || {};

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
        <ProjectButtonBar includeNavigationMenu={ true }>
          <LibraryZipUpload onZipFileSelected={ this.props.uploadZipFile } />
        </ProjectButtonBar>
      </div>
    );
  }
}

const actions = { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, usePageForView, saveLinksForView };

const mapStateToProps = state => {
  const { directories } = state.app.library;

  return { directories }
};

const LibraryContainerWithStyles = injectSheet(styles)(Library);
export default connect(mapStateToProps, actions)(LibraryContainerWithStyles);
