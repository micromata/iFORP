const getBorderRadius = props => {
  if (props.buttonStyle === 'round') return '100px';

  if (props.buttonStyle === 'rounded-corners') return '8px';

  return 0;
}

export default theme => ({
  button: {
    color: theme.Button.textColor,
    backgroundColor: theme.accentColor,
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    userSelect: 'none',
    padding: '8px 45px',
    outlineStyle: 'none',
    cursor: 'pointer',
    borderRadius: getBorderRadius,
    minHeight: '30px',
    minWidth: props => props.minimumWidth || 0,
    '&:hover':{
      backgroundColor: theme.accentColor,
    },
    '&[disabled]':{
      color: theme.Button.textColorDisabled,
      background: theme.Button.backgroundColorDisabled,
      border: 'none',
      cursor: 'not-allowed'
    },
    '&.ghost': {
      color: theme.Button.textColor,
      background: theme.Button.backgroundColorGhost,
    },
    '&.light': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.accentColor}`,
      color: theme.accentColor,
      '&:hover':{
        backgroundColor: theme.accentColor,
        color: theme.textColor
      },
    }
  },
});
