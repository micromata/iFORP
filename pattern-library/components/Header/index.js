import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';
import Text from '../Text';

const Header = ({ classes, title }) => (
  <header className={ classes.header }>
    <Text>{ title }</Text>
  </header>
);

export default injectSheet(styles)(Header);
