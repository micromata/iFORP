import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonTile.styles.js';
import CircleButton from './CircleButton';
import DeleteIcon from '../../assets/img/Delete';

const getClassNames = (classes, connectRight, highlighted, small) => {
  const classNames = [classes.ButtonTile];
  if (connectRight) classNames.push('ConnectRight');
  if (highlighted) classNames.push('highlighted');
  if (small) classNames.push('small');
  return classNames.join(' ');
}

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
  connectRight = false,
  highlighted = false,
  small = false
}) => (
  <div id={ id } className={getClassNames(classes, connectRight, highlighted, small)}>
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
