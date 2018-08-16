import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';

const Button = ({
  classes,
  type = 'button',
  buttonStyle = 'default',
  children,
  onClick,
}) => (
  <button type={type} className={classes.button} onClick={onClick}>
    {children}
  </button>
);

export default injectSheet(styles)(Button);
