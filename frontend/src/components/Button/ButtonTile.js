import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonTile.styles.js';
import Folder from '../../assets/img/Folder';

const Button = ({ classes, onClick, disabled = false, children }) => (
  <div className={classes.ButtonTile}>
    <button className={`btn`} onClick={onClick} disabled={disabled}>
      <Folder />
    </button>
    {children && (
      <a className={classes.ProjectName} onClick={onClick}>
        {children}
      </a>
    )}
  </div>
);

export default injectSheet(styles)(Button);
