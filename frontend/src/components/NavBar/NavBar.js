import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import personIcon from '../../assets/img/icon-person.svg';
import closeIcon from '../../assets/img/icon-close.svg';
import chevronDown from '../../assets/img/icon-chevron-down.svg';

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

const styles = theme => ({
  NavBar: {
    backgroundColor: theme.NavBar.backgroundColor,
    width: '100%',
    height: '53px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NavItem: {
    display: 'flex',
    flexBasis: '30%',
    padding: '0 18px',
    justifyContent: 'center',
    color: theme.NavBar.textColor,
    textDecoration: 'none',
    '& a': {
      textDecoration: 'none',
      color: theme.NavBar.textColor,
    },
    '&.nav-left': {
      justifyContent: 'flex-start',
    },
    '&.nav-center': {
      fontSize: '18px',
    },
    '&.nav-right': {
      justifyContent: 'flex-end',
      fontSize: '12px',
      '&.account-settings': {},
    },
  },
  AccountActions: {
    padding: '0 8px',
  },
  BackNavigation: {
    height: '100%',
  },
});

export default injectSheet(styles)(NavBar);
