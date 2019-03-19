import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import BackIcon from '../../assets/img/Back';
import styles from './NavBar.styles';
import UserDropdown from '../UserDropdown/UserDropdown';
import EditableText from '../EditableText/EditableText';

export const NavBarHeight = '53px';

export const NavBar = ({ classes, theme, title, exit = false, exitUrl = '/', onTitleEdited = null }) => (
  <div className={classes.NavBar + ' nav-bar'}>
    <div className={classes.NavItem + ' nav-left'}>
      {exit && exitUrl &&
        <Link to={ exitUrl }>
          <BackIcon color={ theme.NavBar.textColor } />
        </Link>
      }
    </div>
    <div className={classes.NavItem + ' nav-center'}>
      { typeof onTitleEdited === 'function' &&
        <EditableText text={ title } onEditingConfirmed={ onTitleEdited } />
      }
      { typeof onTitleEdited !== 'function' &&
        title
      }
    </div>
    <div className={classes.NavItem + ' nav-right'}>
      <UserDropdown />
    </div>
  </div>
);

export default injectSheet(styles)(NavBar);
