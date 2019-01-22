import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Project.styles';
import NavBar from '../../components/NavBar/NavBar';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';

class Project extends Component {
  componentWillMount() {
    console.log(this.props.match.params.id)
  }

  render() {
    if (!this.props.project) return null;

    return (
      <React.Fragment>
        <NavBar exit title={ `iFORP > ${ this.props.project.name }` } />
        <ElementGrid>
          { this.props.project.whiteboards.map(whiteboard =>
            <ButtonTile
              key={ whiteboard.id }
              titleBelow>
              { whiteboard.name }
            </ButtonTile>
          )}
        </ElementGrid>
        <ButtonBar />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.id, 10);
  return {
    project: state.app.projects.find(project => project.id === projectId)
  }
};

const ProjectContainerWithStyles = injectSheet(styles)(Project);
export default connect(mapStateToProps)(ProjectContainerWithStyles);
