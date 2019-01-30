import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonTile.styles.js';
import CircleButton from './CircleButton';
import Folder from '../../assets/img/Folder';
import DeleteIcon from '../../assets/img/Delete';

const ButtonTile = ({
  classes,
  onClick,
  onDeleteClick,
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
      )
    }
    {onDeleteClick &&
      <div className={classes.DeleteButton}>
        <CircleButton onClick={onDeleteClick}>
          <DeleteIcon />
        </CircleButton>
      </div>
    }
    <button className={`btn`} onClick={onClick} disabled={disabled}>
      <Folder />
    </button>
    {children &&
      titleBelow && (
        <div className={classes.ProjectName}>
          {children}
        </div>
      )}
  </div>
);

export default injectSheet(styles)(ButtonTile);
