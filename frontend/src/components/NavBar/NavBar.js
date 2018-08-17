import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import personIcon from '../../assets/img/icon-person.svg';
import closeIcon from '../../assets/img/icon-close.svg';
import chevronDown from '../../assets/img/icon-chevron-down.svg';
import styles from "./NavBar.styles";

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
      <img src={chevronDown} alt="Open account actions" />
      <img
        src={personIcon}
        className={classes.AccountActions}
        alt="Account actions"
      />
      Username
    </div>
  </div>
);

export default injectSheet(styles)(NavBar);
