import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import ButtonBar from '../ButtonBar/ButtonBar';
import ProjectNav from './ProjectNav';
import CircleButton from '../Button/CircleButton';
import PlusIcon from '../../assets/img/Plus';
import ListIcon from '../../assets/img/List';
import styles from './ProjectButtonBar.styles';

export class ProjectButtonBar extends Component {
  constructor(props) {
    super(props);
    this.state = { projectNavVisible: false };
  }

  handleShowProjectNavClick = () => {
    this.setState({ projectNavVisible: true });
  }

  handleHideProjectNavClick = () => {
    this.setState({ projectNavVisible: false });
  }

  render() {
    return (
      <React.Fragment>
        <ButtonBar className={ this.state.projectNavVisible ? 'fade' : '' }>
          <div />
          <CircleButton onClick={ this.onPlusButtonClick }>
            <PlusIcon />
          </CircleButton>
          <CircleButton onClick={ this.handleShowProjectNavClick }>
            <ListIcon />
          </CircleButton>
        </ButtonBar>
        <ProjectNav onClose={ this.handleHideProjectNavClick } className={ this.state.projectNavVisible ? 'visible' : '' }>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/library'>Bibliothek</Link>
            </li>
          </ul>
        </ProjectNav>
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(ProjectButtonBar);
