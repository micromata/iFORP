import React from 'react';
import injectSheet from 'react-jss';
import styles from './DropdownItem.styles';

const DropdownItem = ({
  classes,
  buttonStyle = 'default',
  children,
  onClick,
  disabled = false,
}) => (
  <button
    className={classes['dropdown-item']}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default injectSheet(styles)(DropdownItem);
