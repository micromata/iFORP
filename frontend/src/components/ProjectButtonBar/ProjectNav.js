import React from 'react';
import injectSheet from 'react-jss';
import styles from './ProjectNav.styles';
import CircleButton from '../Button/CircleButton';
import CloseIcon from '../../assets/img/CloseSmall';

export const ProjectNav = ({ classes, className, children, onClose }) => (
  <div className={ `${classes.ProjectNav} ${className}` }>
    <CircleButton className={ classes.CloseButton } onClick={ onClose } >
      <CloseIcon />
    </CircleButton>
    { children }
  </div>
);

export default injectSheet(styles)(ProjectNav);
