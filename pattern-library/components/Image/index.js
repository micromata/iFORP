import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';

const Image = ({ classes, src, alt = ''}) => (
  <img className={classes.image} src={src} alt={alt} />
);

export default injectSheet(styles)(Image);
