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
import ImagePreview from '../../components/ImagePreview/ImagePreview';
import { getLibraryDirectories, getViewsForWhiteboard, getViewDetails, getPageDetails, uploadZipFile, uploadImages, usePageForView, saveLinksForView } from '../../actions/app-actions';
import { findPageWithId, findImageWithId } from '../../utils';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'html',
      selectedDirectoryItemId: null,
    };
  }

  componentDidMount() {
    this.props.getLibraryDirectories();
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

  render() {
    const selectedPage = this.state.selectedFilter === 'html' && (findPageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {});
    const selectedImage = this.state.selectedFilter === 'image' && (findImageWithId(this.props.directories, this.state.selectedDirectoryItemId) || {});

    return (
      <div className={ this.props.classes.Library }>
        <NavBar title={ `iFORP > Bibliothek` } exit />
        <LibraryFilter selectedFilter={ this.state.selectedFilter } onFilterChange={ this.handleFilterChange } />
        <main>
          <LibraryTreeView
            directories={ this.props.directories }
            fileTypeFilter={ this.state.selectedFilter }
            onSelectItem={ this.handleSelectDirectoryItem }
          />

          <div className='content'>
            { this.state.selectedFilter === 'html' &&
              <HTMLPage
                htmlElementAttributes={ selectedPage.htmlElementAttributes || {} }
                head={ selectedPage.head || '' }
                body={ selectedPage.body || '' }
                assets={ selectedPage.assets || [] }
                viewportSize="desktop"
              />
            }
            { this.state.selectedFilter === 'image' &&
              <ImagePreview
                image={ selectedImage }
                viewportSize="desktop"
              />
            }
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
