import React from 'react';

import injectSheet from 'react-jss';

import styles from './styles';

const Text = ({ classes, children }) => (
  <span className={ classes.text }>{ children }</span>
);

export default injectSheet(styles)(Text);
