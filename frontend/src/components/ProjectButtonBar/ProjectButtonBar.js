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
        <ButtonBar className={ `${this.props.pullUp ? 'pullUp' : ''} ${this.state.navigationMenuVisible ? 'fade' : ''}` }>
          { this.props.children }
          { this.props.entries && this.props.entries.length &&
            <CircleButton onClick={ this.handleShowNavigationMenuClick }>
              <ListIcon />
            </CircleButton>
          }
        </ButtonBar>
        { this.props.entries && this.props.entries.length &&
          <NavigationMenu onClose={ this.handleHideNavigationMenuClick } className={ this.state.navigationMenuVisible ? 'visible' : '' }>
            <ul>
              { this.props.entries.map((entry, index) =>
                <li key={ index }>
                  <Link to={ entry.url }>{ entry.title }</Link>
                </li>
              )}
            </ul>
          </NavigationMenu>
        }
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(ProjectButtonBar);
