import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import ButtonBar from '../ButtonBar/ButtonBar';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import CircleButton from '../Button/CircleButton';
import ListIcon from '../../assets/img/List';
import styles from './ProjectButtonBar.styles';

export class ProjectButtonBar extends Component {
  constructor(props) {
    super(props);
    this.state = { navigationMenuVisible: false };
  }

  handleShowNavigationMenuClick = () => {
    this.setState({ navigationMenuVisible: true });
  }

  handleHideNavigationMenuClick = () => {
    this.setState({ navigationMenuVisible: false });
  }

  render() {
    return (
      <React.Fragment>
        <ButtonBar className={ this.state.navigationMenuVisible ? 'fade' : '' }>
          { this.props.children }
          { this.props.includeNavigationMenu &&
            <CircleButton onClick={ this.handleShowNavigationMenuClick }>
              <ListIcon />
            </CircleButton>
          }
        </ButtonBar>
        { this.props.includeNavigationMenu &&
          <NavigationMenu onClose={ this.handleHideNavigationMenuClick } className={ this.state.navigationMenuVisible ? 'visible' : '' }>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/library'>Bibliothek</Link>
              </li>
            </ul>
          </NavigationMenu>
        }
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(ProjectButtonBar);
