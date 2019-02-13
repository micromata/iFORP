import React from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';

export const Toggle = ({
  isActive = false,
  onToggle,
  labelLeft = '',
  labelRight = '',
  classes,
}) => (
  <div className={classes.Toggle}>
    <label
      htmlFor="toggle"
      className={classnames({
        active: isActive,
      })}
    >
      {labelLeft}
    </label>
    <input
      type="checkbox"
      className="toggle-checkbox"
      name="toggle"
      id="toggle"
      checked={isActive}
      onChange={() => {
        onToggle(!isActive);
      }}
    />
    <label htmlFor="toggle" className="toggle-button" />
    <label
      htmlFor="toggle"
      className={classnames({
        active: !isActive,
      })}
    >
      {labelRight}
    </label>
  </div>
);

const styles = theme => ({
  Toggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .toggle-checkbox:checked+.toggle-button::before': {
      left: '24px',
    },
    '& label': {
      cursor: 'pointer',
      color: props => props.colorInactive || theme.accentColor || '#5E5E5E',
    },
    '& label.active': {
      color: props => props.textColorActive || theme.textColor || '#999'
    },
    '& .toggle-button': {
      margin: '0 30px',
      border: '1px solid #E0E0E0',
      backgroundColor: '#FFFFFF',
      borderRadius: '25px',
      boxShadow: 'inset rgba(0,0,0,0.5) 0 3px 3px 0',
      position: 'relative',
      height: '26px',
      width: '50px',
      cursor: 'pointer',
      '&::before': {
        content: '""',
        padding: '12px',
        backgroundColor: props => props.colorActive || theme.accentColor || '#5E5E5E',
        position: 'absolute',
        borderRadius: '15px',
        boxShadow: 'rgba(0,0,0,0.5) 0 1px 3px 0',
        transition: 'left 0.25s',
        transitionTimingFunction: 'linear',
        left: 0,
      },
    },
    '& input': {
      display: 'none',
    },
  },
});

export default injectSheet(styles)(Toggle);
