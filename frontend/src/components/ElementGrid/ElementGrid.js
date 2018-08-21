import React from 'react';
import injectSheet from 'react-jss';

const ElementGrid = ({ classes, children }) => <div className={classes.ElementGrid}>{children}</div>;

const styles = theme => ({
  ElementGrid: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  }
});

export default injectSheet(styles)(ElementGrid);
