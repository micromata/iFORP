import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';

const Button = ({ classes, type = 'button', buttonStyle = 'default', children }) => (
  <button type={type} className={classes.button}>{children}</button>
);

export default injectSheet(styles)(Button);
