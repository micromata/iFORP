import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import injectSheet from 'react-jss';
import styles from './Start.styles';
import Button from '../../components/Button/Button';
import Dots from '../../assets/img/Dots';

class Start extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar title="iFORP" />
        <div className={this.props.classes.Start}>
          <div className="newProjectText">
            <p>Start prototyping</p>
            <p>with a</p>
          </div>
          <div className="newProject">
            <Button
              onClick={() => {
                console.log('Link to new Project');
              }}
            >
              New Project
            </Button>
          </div>
          <div className="recentProjectText">
            <p>or</p>
            <p>choose a recent project</p>
          </div>
          <ElementGrid>
            <ButtonTile>Project 1</ButtonTile>
            <ButtonTile>Project 2</ButtonTile>
            <ButtonTile>Project 3</ButtonTile>
            <Button className="ghost" onClick={() => {console.log('Link to project overview')}}>
              <Dots />
            </Button>
          </ElementGrid>
        </div>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(Start);
