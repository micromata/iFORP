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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  NavItem: {
    display: 'flex',
    flexBasis: '30%',
    // ARGH y u no work
    '& .nav-center': {
      alignItems: 'center'
    },
    '& .nav-right': {
      alignItems: 'flex-end'
    }
  }
});

export default injectSheet(styles)(NavBar);
