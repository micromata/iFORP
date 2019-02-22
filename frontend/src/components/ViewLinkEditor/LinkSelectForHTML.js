import React from 'react';
import injectSheet from 'react-jss';
import styles from './LinkSelectForHTML.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';

const LinkSelectForHTML = ({
  classes,
  theme,
  label,
  options,
  value,
  onChange,
}) => (
  <div className={classes.LinkSelectForHTML}>
    <label>
      { label }
    </label>
    <div className={classes.SelectHelper}>
      <select
        value={value}
        onChange={onChange}
        >
          { options.map((option, index) => (
            <option key={ index } value={ option.value }>{ option.title }</option>
          ))
        }
      </select>
      <ArrowDownIcon color={ theme.textColorPrimary } />
    </div>
  </div>
);

export default injectSheet(styles)(LinkSelectForHTML);
