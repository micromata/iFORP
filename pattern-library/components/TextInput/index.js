import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles';

const TextInput = ({ classes, value, placeholder, onChange }) => (
  <input
    type="text"
    className={classes.textInput}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default injectSheet(styles)(TextInput);
