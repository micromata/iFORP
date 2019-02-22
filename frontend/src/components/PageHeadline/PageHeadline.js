import React from 'react';
import injectSheet from 'react-jss';
import styles from './PageHeadline.styles.js';

const PageHeadline = ({ classes, title, subtitle }) => (
  <h3 className={ classes.PageHeadline }>
    { title }
    { subtitle &&
      <span className='subtitle'> ({subtitle})</span>
    }
  </h3>
);

export default injectSheet(styles)(PageHeadline);
