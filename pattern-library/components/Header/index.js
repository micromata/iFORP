import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';
import Text from '../Text/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCaretDown,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const Header = ({ classes, title }) => (
  <header className={classes.header}>
    <FontAwesomeIcon className={classes.headerCloseIcon} icon={faTimes} />
    <span className={classes.headerTitle}>{title}</span>
    <div>
      <FontAwesomeIcon className={classes.headerDropDownIcons} icon={faCaretDown} />
      <FontAwesomeIcon className={classes.headerDropDownIcons} icon={faUser} />
      <Text color="#ffffff">Username</Text>
    </div>
  </header>
);

export default injectSheet(styles)(Header);
