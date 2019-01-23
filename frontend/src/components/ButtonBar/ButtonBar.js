import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonBar.styles';

export const ButtonBar = ({ classes, children }) => (
  <div className={ classes.ButtonBar }>
    { children }
  </div>
);

export default injectSheet(styles)(ButtonBar);
