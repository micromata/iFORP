import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Library.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibraryFilter from '../../components/Library/LibraryFilter';
import LibraryTreeView from '../../components/Library/LibraryTreeView';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import LibraryZipUpload from '../../components/Library/LibraryZipUpload';
import LibraryImagesUpload from '../../components/Library/LibraryImagesUpload';
import HTMLPage from '../../components/HTMLPage/HTMLPage';
import { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, uploadImages, usePageForView, saveLinksForView } from '../../actions/app-actions';
import { baseURL, findPageWithId, findImageWithId } from '../../utils';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: window.localStorage.getItem('iforp.library.selectedFilter') || 'html',
      selectedDirectoryItemId: null,
    };
  }

  componentDidMount() {
    this.props.getLibraryDirectories();
  }

  handleFilterChange = selectedFilter => {
    window.localStorage.setItem('iforp.library.selectedFilter', selectedFilter);
    this.setState({ selectedFilter, selectedDirectoryItemId: null });
  }

  handleSelectDirectoryItem = selectedDirectoryItemId => {
    this.setState({ selectedDirectoryItemId });

    if (this.state.selectedFilter === 'html') {
      this.props.getPageDetails(selectedDirectoryItemId);
    }
  }

  getPreviewData = () => {
    if (this.state.selectedFilter === 'html') {
      const page = findPageWithId(this.props.directories, this.state.selectedDirectoryItemId);
      if (!page) return {};

      return {
        htmlElementAttributes:  page.htmlElementAttributes,
        head: page.head,
        body: page.body,
        assets: page.assets
      }
    }

    const image = findImageWithId(this.props.directories, this.state.selectedDirectoryItemId);
    if (!image) return {};
    return {
      htmlElementAttributes: { lang: 'en'},
      head: '<style>html, body { margin: 0; padding: 0; }</style>',
      body: `<div style='width: ${image.width}px; height: ${image.height}px; background-image: url(${baseURL}/library/images/${image.name});' />`,
      assets: []
    };
  }

  render() {
    const previewData = this.getPreviewData();

    return (
      <div className={ this.props.classes.Library }>
        <NavBar title={ `iFORP > Bibliothek` } exit />
        <LibraryFilter selectedFilter={ this.state.selectedFilter } onFilterChange={ this.handleFilterChange } />
        <main>
          <LibraryTreeView
            directories={ this.props.directories }
            fileTypeFilter={ this.state.selectedFilter }
            selectedItemId={ this.state.selectedDirectoryItemId }
            onSelectItem={ this.handleSelectDirectoryItem }
          />

          <div className='content'>
            <HTMLPage
              htmlElementAttributes={ previewData.htmlElementAttributes || {} }
              head={ previewData.head || '' }
              body={ previewData.body || '' }
              assets={ previewData.assets || [] }
              viewportSize="desktop"
            />
          </div>
        </main>
        <ProjectButtonBar includeNavigationMenu={ true }>
          { this.state.selectedFilter === 'html' &&
            <LibraryZipUpload onZipFileSelected={ this.props.uploadZipFile } />
          }
          { this.state.selectedFilter === 'image' &&
            <LibraryImagesUpload onImagesSelected={ this.props.uploadImages } />
          }
        </ProjectButtonBar>
      </div>
    );
  }
}

const actions = { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, uploadImages, usePageForView, saveLinksForView };

const mapStateToProps = state => {
  const { directories } = state.app.library;

  return { directories }
};

const LibraryContainerWithStyles = injectSheet(styles)(Library);
export default connect(mapStateToProps, actions)(LibraryContainerWithStyles);
