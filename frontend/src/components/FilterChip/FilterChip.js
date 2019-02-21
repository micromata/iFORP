import React from 'react';
import injectSheet from 'react-jss';
import styles from './FilterChip.styles.js';
import CheckmarkIcon from '../../assets/img/Checkmark';

const FilterChip = ({ theme, classes, text, checked, onCheckedChange }) => (
  <div className={`${classes.FilterChip} ${checked ? 'checked' : ''}`} onClick={ onCheckedChange }>
    { checked &&
      <CheckmarkIcon color={ theme.FilterChip.textColorChecked } />
    }
    {text}
  </div>
);

export default injectSheet(styles)(FilterChip);
