import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewportSwitch.styles';
import ViewportDesktopIcon from '../../assets/img/ViewportDesktop';
import ViewportTabletIcon from '../../assets/img/ViewportTablet';
import ViewportPhoneIcon from '../../assets/img/ViewportPhone';

export const ViewportSwitch = ({ classes, theme, currentViewportSize, onChangeViewportSize }) => (
  <div className={ classes.ViewportSwitch }>
    <button type='button' onClick={ () => onChangeViewportSize('phone') }>
      <ViewportPhoneIcon
        color={ currentViewportSize === 'phone' ? theme.ViewportSwitch.colorSelected : theme.ViewportSwitch.colorDefault }
      />
    </button>
    <button type='button' onClick={ () => onChangeViewportSize('tablet') }>
      <ViewportTabletIcon
        color={ currentViewportSize === 'tablet' ? theme.ViewportSwitch.colorSelected : theme.ViewportSwitch.colorDefault }
      />
    </button>
    <button type='button' onClick={ () => onChangeViewportSize('desktop') }>
      <ViewportDesktopIcon
        color={ currentViewportSize === 'desktop' ? theme.ViewportSwitch.colorSelected : theme.ViewportSwitch.colorDefault }
      />
    </button>
  </div>
);

export default injectSheet(styles)(ViewportSwitch);
