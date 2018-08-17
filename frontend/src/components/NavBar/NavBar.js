import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/img/icon-close.svg';
import styles from './NavBar.styles';
import UserDropdown from '../UserDropdown/UserDropdown';

export const NavBarHeight = '53px';

export const NavBar = ({ classes, title }) => (
  <div className={classes.NavBar + ' nav-bar'}>
    <div className={classes.NavItem + ' nav-left'}>
      <Link to="/">
        <img
          src={closeIcon}
          className={classes.BackNavigation}
          alt="Close / Go back"
        />
      </Link>
    </div>
    <Link className={classes.NavItem + ' nav-center'} to="/login">
      {title}
    </Link>
    <div className={classes.NavItem + ' nav-right'}>
      <UserDropdown userName="Andy" />
    </div>
  </div>
);

export default injectSheet(styles)(NavBar);
