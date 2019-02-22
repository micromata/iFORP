export default theme => ({
  button: {
    backgroundColor: theme.accentColor,
    color: theme.Button.textColor,
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outlineStyle: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    background: theme.accentColor,
    boxShadow: '0 2px 10px 0 rgba(0,0,0,0.16), 0 2px 5px 0 rgba(0,0,0,0.26)',
    minHeight: '56px',
    minWidth: '56px',
    '&.ghost': {
      color: theme.Button.textColor,
      background: theme.Button.backgroundColorGhost
    },
    '&[disabled]':{
      color: theme.Button.textColorDisabled,
      background: theme.Button.backgroundColorDisabled,
      border: 'none',
      cursor: 'not-allowed'
    }
  },
});
