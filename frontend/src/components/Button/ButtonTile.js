import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonTile.styles.js';
import { Link } from 'react-router-dom';
import Folder from '../../assets/img/Folder';

const Button = ({ classes, linkTo = '#', disabled = false, children }) => (
  <div>
    <Link className={classes.ButtonTile} to={linkTo} disabled={disabled}>
      <Folder />
    </Link>
    <Link className={classes.ProjectName} to={linkTo}>
      {children}
    </Link>
  </div>
);

export default injectSheet(styles)(Button);
