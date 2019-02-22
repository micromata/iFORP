export default theme => ({
  button: {
    backgroundColor: theme.accentColor,
    color: theme.textColorSecondary,
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
    minHeight: '56px',
    minWidth: '56px',
    '&.ghost': {
      color: theme.textColorSecondary,
      background: theme.bgColorPrimary,
    },
    '&[disabled]':{
      color: theme.textColorTertiary,
      background: theme.bgColorTertiary,
      border: 'none',
      cursor: 'not-allowed'
    }
  },
});
