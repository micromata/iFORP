import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProjects, createNewProject } from '../../actions/app-actions';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import injectSheet from 'react-jss';
import styles from './Start.styles';
import Button from '../../components/Button/Button';
import Dots from '../../assets/img/Dots';

class Start extends Component {
  constructor(props) {
    super(props);

    this.createNewProject = this.createNewProject.bind(this);
  }

  createNewProject() {
    this.props.createNewProject();
    // This.props.history.push(`projects/newProject`);
  }

  componentDidMount() {
    this.props.getAllProjects();
  }

  render() {
    const hasExistingProject = Boolean(this.props.projects && this.props.projects.length);

    return (
      <React.Fragment>
        <NavBar title="iFORP" />
        <div className={this.props.classes.Start}>
          <div className="newProjectText">
            <p>Start prototyping</p>
            <p>with a</p>
          </div>
          <div className="newProject">
            <Button onClick={this.createNewProject}>New Project</Button>
          </div>

          { hasExistingProject &&
            <React.Fragment>
              <div className="recentProjectText">
                <p>or</p>
                <p>choose a recent project</p>
              </div>
              <ElementGrid>
                { this.props.projects.map(project =>
                  <ButtonTile key={ project.id } titleBelow>{ project.name }</ButtonTile>
                )}
                <Button
                  className="ghost"
                  onClick={() => {
                    console.log('Link to project overview');
                  }}
                  >
                  <Dots />
                </Button>
              </ElementGrid>
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.app.projects
});

const actions = { getAllProjects, createNewProject };

const StartContainerWithSheet = injectSheet(styles)(Start);
export default connect(mapStateToProps, actions)(StartContainerWithSheet);
