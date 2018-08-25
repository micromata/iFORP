import React from 'react';
import injectSheet from 'react-jss';
import styles from './Button.styles.js';

const Button = ({
  classes,
  type = 'button',
  buttonStyle = 'default',
  children,
  onClick,
  disabled = false,
}) => (
  <button
    type={type}
    className={classes.button}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default injectSheet(styles)(Button);
