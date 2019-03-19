import React from 'react';
import injectSheet from 'react-jss';
import styles from './Button.styles.js';

const Button = ({
  classes,
  className = '',
  type = 'button',
  children,
  onClick,
  disabled = false,
}) => (
  <button
    type={type}
    className={`${classes.button} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default injectSheet(styles)(Button);
