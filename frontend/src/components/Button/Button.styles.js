const getBorderRadius = props => {
  if (props.buttonStyle === 'round') return '100px';

  if (props.buttonStyle === 'rounded-corners') return '8px';

  return 0;
}

export default theme => ({
  button: {
    backgroundColor: theme.accentColor,
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
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
      background: '#FCDD8F',
      border: 'none',
      cursor: 'not-allowed'
    },
    '&.ghost': {
      backgroundColor: 'transparent',
      border: 'none',
    },
    '&.light': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.accentColor}`,
      color: theme.accentColor,
      '&:hover':{
        backgroundColor: theme.accentColor,
        color: '#fff'
      },
    }
  },
});
