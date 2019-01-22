import React from 'react';
import injectSheet from 'react-jss';
import styles from './ButtonBar.styles';
import CircleButton from '../Button/CircleButton';

export const ButtonBar = ({ classes }) => (
  <div className={ classes.ButtonBar }>
    <div className={classes.ButtonBarItem + ' button-left'}>
      <CircleButton />
    </div>
    <div className={classes.ButtonBarItem + ' button-center'}>
      <CircleButton />
    </div>
    <div className={classes.ButtonBarItem + ' button-right'}>
      <CircleButton />
    </div>
  </div>
);

export default injectSheet(styles)(ButtonBar);
