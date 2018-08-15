import React from 'react';
import injectSheet from 'react-jss';

export const NavBar = ({ classes }) => (
  <div className={classes.NavBar + ' nav-bar'}>
    <div className={classes.NavItem + ' nav-left'}>
      <a href="/">Back</a>
    </div>
    <div className={classes.NavItem + ' nav-center'}>Blubber</div>
    <div className={classes.NavItem + ' nav-right'}>Dropdown</div>
  </div>
);

const styles = theme => ({
  NavBar: {
    backgroundColor: theme.NavBar.backgroundColor,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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
    // ARGH y u no work
    // Cuz u left a whitespace
    '&.nav-center': {
      color: 'green',
    },
    '&.nav-right': {
      color: 'blue',
    },
    // Last child works, too! Now we rollin'!!!
    '&:first-child': {
      justifyContent: "flex-start",
    },
    '&:last-child': {
      justifyContent: "flex-end",
    },
  }
});

export default injectSheet(styles)(NavBar);
