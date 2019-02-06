import React from 'react';
import injectSheet from 'react-jss';
import styles from './SelectWithLabel.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';

const isDefaultValue = value => !value || value === '0';

const SelectWithLabel = ({
  classes,
  label,
  options,
  value,
  onChange,
}) => (
  <div className={classes.SelectWithLabel}>
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
      <ArrowDownIcon color={ isDefaultValue(value) ? '#3D3D3D' : '#F9BB1F' } />
    </div>
  </div>
);

export default injectSheet(styles)(SelectWithLabel);