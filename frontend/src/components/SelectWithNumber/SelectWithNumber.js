import React from 'react';
import injectSheet from 'react-jss';
import styles from './SelectWithNumber.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';

const isDefaultValue = value => !value || value === '0';

const SelectWithNumber = ({
  classes,
  theme,
  number,
  options,
  value,
  onChange,
}) => (
  <div className={classes.SelectWithNumber}>
    <div className={classes.Number}>
      { number }
    </div>
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

export default injectSheet(styles)(SelectWithNumber);
