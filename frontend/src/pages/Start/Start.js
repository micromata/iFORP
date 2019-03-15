import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewProject } from '../../actions/app-actions';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import TileProjectIcon from '../../assets/img/TileProject';
import injectSheet from 'react-jss';
import styles from './Start.styles';
import Button from '../../components/Button/Button';
import CircleButton from '../../components/Button/CircleButton';
import TextInput from '../../components/TextInput/TextInput';
import Dots from '../../assets/img/Dots';
import PlusIcon from '../../assets/img/Plus';

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProjectName: '',
      newWhiteboardName: '',
      newProjectOpen: false
    }
  }

  navigateToProjectOverview = () => {
    this.props.history.push(`projects`);
  }

  navigateToProject = projectId => {
    this.props.history.push(`/projects/${projectId}`);
  }

  navigateToWhiteboard = (projectId, whiteboardId) => {
    this.props.history.push(`/projects/${projectId}/whiteboards/${whiteboardId}`);
  };

  openNewProjectOptions = () => {
    this.setState({ newProjectOpen: true });
  }

  createNewProject = () => {
    this.props.
      createNewProject(this.state.newProjectName, this.state.newWhiteboardName).
      then(project => {
        this.navigateToWhiteboard(project.id, project.whiteboards[0].id);
      });
  }

  render() {
    const hasExistingProject = Boolean(this.props.projects && this.props.projects.length);

    return (
      <React.Fragment>
        <NavBar title="iFORP" />
        <div className={this.props.classes.Start}>
          <div className="newProject">
            <p>Beginne mit dem Prototyping eines neuen Projekts</p>
            <CircleButton onClick={this.openNewProjectOptions}>
              <PlusIcon />
            </CircleButton>
            { this.state.newProjectOpen &&
              <div className="newProjectName">
                Gib Deinem Projekt einen Namen
                <TextInput
                  placeholder="Projektname"
                  onChange={ event => this.setState({newProjectName: event.target.value.trim()})}
                />
                <TextInput
                  placeholder="Name des ersten Whiteboards"
                  onChange={ event => this.setState({newWhiteboardName: event.target.value.trim()})}
                />
                <Button buttonStyle="round" onClick={ this.createNewProject } disabled={!this.state.newProjectName || !this.state.newWhiteboardName}>
                  Start
                </Button>
              </div>
            }
          </div>

          { hasExistingProject &&
            <div className="recentProjects">
              <p>Wähle ein aktuelles Projekt</p>
              <ElementGrid>
                { this.props.projects.map(project =>
                  <ButtonTile
                    key={ project.id }
                    small
                    titleBelow
                    TileIcon={ TileProjectIcon }
                    onClick={ () => this.navigateToProject(project.id ) }>
                    { project.name }
                  </ButtonTile>
                )}
                <Button
                  className="ghost"
                  onClick={this.navigateToProjectOverview}
                  >
                  <Dots color={ this.props.theme.Button.textColor } />
                </Button>
              </ElementGrid>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.app.projects.slice(0, 2)
});

const actions = { createNewProject };

const StartContainerWithStyles = injectSheet(styles)(Start);
export default connect(mapStateToProps, actions)(StartContainerWithStyles);
