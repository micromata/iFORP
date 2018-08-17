import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles';

const TextInput = ({
  classes,
  value,
  placeholder,
  type = 'text',
  onChange,
}) => (
  <input
    type={type}
    className={classes.textInput}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default injectSheet(styles)(TextInput);
