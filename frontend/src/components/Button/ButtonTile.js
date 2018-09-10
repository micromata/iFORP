import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonTile.styles.js';
import Folder from '../../assets/img/Folder';

const Button = ({
  classes,
  onClick,
  disabled = false,
  children,
  titleBelow = false,
}) => (
  <div className={classes.ButtonTile}>
    {children &&
      !titleBelow && (
        <a className={classes.ProjectName} onClick={onClick}>
          {children}
        </a>
      )}
    <button className={`btn`} onClick={onClick} disabled={disabled}>
      <Folder />
    </button>
    {children &&
      titleBelow && (
        <a className={classes.ProjectName} onClick={onClick}>
          {children}
        </a>
      )}
  </div>
);

export default injectSheet(styles)(Button);
