import React from 'react';
import injectSheet from 'react-jss';
import styles from './TextInput.styles';

const TextInput = ({
  classes,
  value,
  placeholder,
  type = 'text',
  onChange,
  onBlur = _ => { },
  onKeyDown = _ => { },
  minLength = 5,
  maxLength = 20
}) => (
  <input
    type={type}
    className={classes.textInput}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={ onBlur }
    onKeyDown={ onKeyDown }
    minLength={ minLength }
    maxLength={ maxLength }
  />
);

export default injectSheet(styles)(TextInput);
