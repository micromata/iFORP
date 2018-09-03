import React from 'react';
import injectSheet from 'react-jss';

const ElementGrid = ({ classes, children }) => (
  <div className={classes.ElementGrid}>{children}</div>
);

const styles = theme => ({
  ElementGrid: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '0 1rem',
    },
  },
});

export default injectSheet(styles)(ElementGrid);
