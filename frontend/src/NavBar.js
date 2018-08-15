import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

export const NavBar = ({ classes }) => (
  <div className={classes.NavBar + ' nav-bar'}>
    <div className={classes.NavItem + ' nav-left'}>
      <Link to="/">Back</Link>
    </div>
    <Link className={classes.NavItem + ' nav-center'} to="/login">
      Login (vorläufig)
    </Link>
    <div className={classes.NavItem + ' nav-right'}>Dropdown</div>
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
    padding: '0 10px',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    '& a': {
      textDecoration: 'none',
      color: 'white',
    },
    '&:first-child': {
      justifyContent: 'flex-start',
    },
    '&:last-child': {
      justifyContent: 'flex-end',
    },
  },
});

export default injectSheet(styles)(NavBar);
