import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ classes, type = 'button', icon }) => (
  <button type={type} className={classes.button}>
    <FontAwesomeIcon className={classes.icon} icon={icon} />
  </button>
);

export default injectSheet(styles)(IconButton);
