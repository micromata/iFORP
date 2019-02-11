import React from 'react';
import injectSheet from 'react-jss';
import styles from './LinkSelectForHTML.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';

const isDefaultValue = value => !value || value === '0';

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
        className={ isDefaultValue(value) ? 'default-value' : '' }
        value={value}
        onChange={onChange}
        >
          { options.map((option, index) => (
            <option key={ index } value={ option.value }>{ option.title }</option>
          ))
        }
      </select>
      <ArrowDownIcon color={ isDefaultValue(value) ? theme.Select.default.textColor : theme.Select.notDefault.textColor } />
    </div>
  </div>
);

export default injectSheet(styles)(LinkSelectForHTML);
