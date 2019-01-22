import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Project.styles';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';

class Project extends Component {
  state = {
    whiteboards: {},
  };

  componentWillMount() {
    console.log(this.props.match.params.id)
  }

  render() {
    return (
      <React.Fragment>
        <NavBar exit title="iFORP" />
        <ElementGrid>
          {console.log(this.state.whiteboards)}
          <ButtonTile />
        </ElementGrid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  project: state.app.projects.find(project => project.id === ownProps.match.params.id)
});

const ProjectContainerWithStyles = injectSheet(styles)(Project);
export default connect(mapStateToProps)(ProjectContainerWithStyles);
