import React from 'react';
import injectSheet from 'react-jss';

const ElementGrid = ({ classes, children, nowrap }) => (
  <div className={`${classes.ElementGrid} ${nowrap ? 'nowrap' : ''}`}>{children}</div>
);

const styles = theme => ({
  ElementGrid: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '&.nowrap': {
      margin: '100px',
      overflow: 'scroll',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start'
    },
    '& > *': {
      margin: '0 1rem',
    },
  },
});

export default injectSheet(styles)(ElementGrid);
