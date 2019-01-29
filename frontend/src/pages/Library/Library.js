import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Library.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibraryFilter from '../../components/Library/LibraryFilter';
import LibrarySidebar from '../../components/Library/LibrarySidebar';
import { getLibraryDirectories, uploadZipFile } from '../../actions/app-actions';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedFilter: 'html' };
  }

  componentDidMount() {
    this.props.getLibraryDirectories();
  }

  handleFilterChange = selectedFilter => {
    this.setState({ selectedFilter });
  }

  handleZipFileSelected = event => {
    const fileToUpload = event.target.files[0];
    event.target.value = null;
    this.props.uploadZipFile(fileToUpload);
  }

  render() {
    return (
      <div className={ this.props.classes.Library }>
        <NavBar title={ `iFORP > Bibliothek` } />
        <LibraryFilter selectedFilter={ this.state.selectedFilter } onFilterChange={ this.handleFilterChange } />
        <main>
          <LibrarySidebar directories={ this.props.directories } onZipFileSelected={ this.handleZipFileSelected } />
        </main>
      </div>
    );
  }
}

const actions = { getLibraryDirectories, uploadZipFile };

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
    directories
  }
};

const LibraryContainerWithStyles = injectSheet(styles)(Library);
export default connect(mapStateToProps, actions)(LibraryContainerWithStyles);
