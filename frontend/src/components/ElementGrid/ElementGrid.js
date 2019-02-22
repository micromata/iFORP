import React from 'react';
import injectSheet from 'react-jss';

const getClassNames = (classes, nowrap, leftAlign) => {
  const classNames = [ classes.ElementGrid ];
  if (nowrap) classNames.push('nowrap');
  if (leftAlign) classNames.push('leftAlign');
  return classNames.join(' ');
}

const ElementGrid = ({ classes, children, nowrap, leftAlign }) => (
  <div className={ getClassNames(classes, nowrap, leftAlign) }>{children}</div>
);

const styles = theme => ({
  ElementGrid: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '-16px',
    marginRight: '-16px',
    flexWrap: 'wrap',
    '&.leftAlign': {
      justifyContent: 'flex-start'
    },
    '&.nowrap': {
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
