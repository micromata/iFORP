import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './Project.styles';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import * as backend from '../../services/backendrequest.service';

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

export default injectSheet(styles)(Project);
