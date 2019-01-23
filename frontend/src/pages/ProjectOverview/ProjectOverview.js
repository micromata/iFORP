import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './ProjectOverview.styles';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import SearchBar from '../../components/SearchBar/SearchBar';

class ProjectOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: ''}
  }

  navigateToProject = projectId => {
    this.props.history.push(`projects/${projectId}`);
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    if (!this.props.projects) return null;

    const filteredProjects = this.state.searchTerm ?
      this.props.projects.filter(project => project.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) :
      this.props.projects;

    return (
      <React.Fragment>
        <NavBar title={ `iFORP` } />
        <SearchBar searchTerm={ this.state.searchTerm } onChange={ this.handleSearchTermChange } />
        <ElementGrid>
          { filteredProjects.map(project =>
            <ButtonTile
              key={ project.id }
              titleBelow
              onClick={ () => this.navigateToProject(project.id ) }>
              { project.name }
            </ButtonTile>
          )}
        </ElementGrid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.app.projects
});

const ProjectOverviewContainerWithStyles = injectSheet(styles)(ProjectOverview);
export default connect(mapStateToProps)(ProjectOverviewContainerWithStyles);
