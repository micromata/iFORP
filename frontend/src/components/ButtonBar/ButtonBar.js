import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonBar.styles';

export const ButtonBar = ({ classes, children, className = '' }) => (
  <div className={ `${classes.ButtonBar} ${className}` }>
    { children }
  </div>
);

export default injectSheet(styles)(ButtonBar);
