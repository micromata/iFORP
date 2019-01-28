import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Library.styles';
import NavBar from '../../components/NavBar/NavBar';
import LibraryFilter from '../../components/Library/LibraryFilter';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedFilter: 'html' };
  }

  handleFilterChange = selectedFilter => {
    this.setState({ selectedFilter });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title={ `iFORP > Bibliothek` } />
        <LibraryFilter selectedFilter={ this.state.selectedFilter } onFilterChange={ this.handleFilterChange } />
      </React.Fragment>
    );
  }
}

const actions = { };

const mapStateToProps = (state, ownProps) => {
  /* eslint-disable no-prototype-builtins */
  const projectId = ownProps.match.params.hasOwnProperty('projectId') ? parseInt(ownProps.match.params.projectId, 10) : null;
  const whiteboardId = ownProps.match.params.hasOwnProperty('whiteboardId') ? parseInt(ownProps.match.params.whiteboardId, 10) : null;
  const viewId = ownProps.match.params.hasOwnProperty('viewId') ? parseInt(ownProps.match.params.viewId, 10) : null;
  /* eslint-enable no-prototype-builtins */

  return {
    projectId,
    whiteboardId,
    viewId
  }
};

const LibraryContainerWithStyles = injectSheet(styles)(Library);
export default connect(mapStateToProps, actions)(LibraryContainerWithStyles);
