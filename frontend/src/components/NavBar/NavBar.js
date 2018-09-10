import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import CloseIcon from '../../assets/img/Close';
import styles from './NavBar.styles';
import UserDropdown from '../UserDropdown/UserDropdown';

export const NavBarHeight = '53px';

export const NavBar = ({ classes, title, exit = false }) => (
  <div className={classes.NavBar + ' nav-bar'}>
    <div className={classes.NavItem + ' nav-left'}>
      {exit && (
        <Link to="/">
          <CloseIcon className={classes.BackNavigation} />
        </Link>
      )}
    </div>
    <Link className={classes.NavItem + ' nav-center'} to="/login">
      {title}
    </Link>
    <div className={classes.NavItem + ' nav-right'}>
      <UserDropdown />
    </div>
  </div>
);

export default injectSheet(styles)(NavBar);
