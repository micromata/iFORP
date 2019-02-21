import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Library.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibrarySidebar from '../../components/Library/LibrarySidebar';
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
      selectedItemType: null,
      selectedDirectoryItemId: null,
    };
  }

  componentDidMount() {
    this.props.getLibraryDirectories();
  }

  handleSelectDirectoryItem = (selectedItemType, selectedDirectoryItemId) => {
    this.setState({selectedItemType, selectedDirectoryItemId });
  }

  getPreviewData = () => {
    if (this.state.selectedItemType === 'html') {
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
      body: `<div style='width: ${image.width}px; height: ${image.height}px; margin-left: auto; margin-right: auto; background-image: url(${baseURL}/library/images/${image.name});' />`,
      assets: []
    };
  }

  render() {
    const previewData = this.getPreviewData();

    return (
      <div className={ this.props.classes.Library }>
        <NavBar title={ `iFORP / Bibliothek` } exit />
        <main>
          <LibrarySidebar
            directories={ this.props.directories }
            selectedItemId={ this.state.selectedDirectoryItemId }
            onSelectItem={ this.handleSelectDirectoryItem }
            onZipFileSelected={ this.props.uploadZipFile }
            onImagesSelected={ this.props.uploadImages }
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
          { Boolean(this.props.directories && this.props.directories.length) &&
            <React.Fragment>
              <LibraryZipUpload onZipFileSelected={ this.props.uploadZipFile } />
              <LibraryImagesUpload onImagesSelected={ this.props.uploadImages } />
            </React.Fragment>
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
