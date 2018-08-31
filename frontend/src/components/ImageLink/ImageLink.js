import React from 'react';
import injectSheet from 'react-jss';
import styles from './ImageLink.styles';

const Image = ({ classes, src, alt = '', title, subtitle }) => (
  <div>
    {title && <p className={classes.Title}>{title}</p>}
    <img className={classes.ImageLink} src={src} alt={alt} />
    {subtitle && <p className={classes.Subtitle + ' ' + classes.Title}>{subtitle}</p>}
  </div>
);

export default injectSheet(styles)(Image);
