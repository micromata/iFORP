import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './ProjectOverview.styles';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import TileProjectIcon from '../../assets/img/TileProject';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import EditableText from '../../components/EditableText/EditableText';
import CircleButton from '../../components/Button/CircleButton';
import PlusIcon from '../../assets/img/Plus';
import Modal from '../../components/Modal/Modal';
import { createNewProject, renameProject, deleteProject } from '../../actions/app-actions';

class ProjectOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', deleteProjectId: null }
  }

  handleCreateProjectClick = () => {
    this.props.createNewProject();
  }

  handleDeleteProjectClick = projectId => {
    this.setState({ deleteProjectId: projectId });
  }

  handleConfirmDeleteProject = () => {
    this.props.deleteProject(this.state.deleteProjectId);
    this.setState({ deleteProjectId: null });
  }

  handleCancelDeleteProject = () => {
    this.setState({ deleteProjectId: null });
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
        <NavBar exit title={ `iFORP > Projektübersicht` } />
        <div className={ this.props.classes.ProjectOverview }>
          <SearchBar searchTerm={ this.state.searchTerm } onChange={ this.handleSearchTermChange } />
          <ElementGrid>
            { filteredProjects.map(project =>
              <ButtonTile
                key={ project.id }
                titleBelow
                TileIcon={ TileProjectIcon }
                onClick={ () => this.navigateToProject(project.id ) }
                onDeleteClick={() => this.handleDeleteProjectClick(project.id)}>
                <EditableText
                  text={ project.name }
                  onEditingConfirmed={ newName => this.props.renameProject(project.id, newName) }
                />
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar entries={ this.props.navigationMenuEntries }>
          <div />
          <CircleButton onClick={ this.handleCreateProjectClick }>
            <PlusIcon />
          </CircleButton>
        </ProjectButtonBar>
        <Modal
          show={ this.state.deleteProjectId }
          headerText='Projekt löschen'
          bodyText={ 'Möchten Sie das Projekt wirklich löschen?' }
          labelCancel='Nein'
          labelConfirm='Ja'
          onCancel={ this.handleCancelDeleteProject }
          onConfirm={ this.handleConfirmDeleteProject }
        />
      </React.Fragment>
    );
  }
}

const actions = { createNewProject, renameProject, deleteProject };

const mapStateToProps = state => ({
  projects: state.app.projects,
  navigationMenuEntries: [
    { title: 'Home', url: '/'},
    { title: 'Bibliothek', url: '/library'}
  ]
});

const ProjectOverviewContainerWithStyles = injectSheet(styles)(ProjectOverview);
export default connect(mapStateToProps, actions)(ProjectOverviewContainerWithStyles);
