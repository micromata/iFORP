import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonTile.styles.js';
import CircleButton from './CircleButton';
import DeleteIcon from '../../assets/img/Delete';

const ButtonTile = ({
  id,
  classes,
  onClick,
  onDeleteClick,
  disabled = false,
  children,
  titleBelow = false,
  TileIcon,
  TileImagePath,
  connectRight = false
}) => (
  <div id={ id } className={`${classes.ButtonTile} ${connectRight ? 'ConnectRight' : ''}`}>
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
      { TileIcon && <TileIcon /> }
      { TileImagePath && <img src={ TileImagePath } /> }
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
