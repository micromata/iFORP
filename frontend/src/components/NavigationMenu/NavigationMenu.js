import React from 'react';
import injectSheet from 'react-jss';
import styles from './NavigationMenu.styles';
import CircleButton from '../Button/CircleButton';
import CloseIcon from '../../assets/img/CloseSmall';

export const NavigationMenu = ({ classes, className, children, onClose }) => (
  <div className={ `${classes.NavigationMenu} ${className}` }>
    <CircleButton className={ classes.CloseButton } onClick={ onClose } >
      <CloseIcon />
    </CircleButton>
    { children }
  </div>
);

export default injectSheet(styles)(NavigationMenu);
