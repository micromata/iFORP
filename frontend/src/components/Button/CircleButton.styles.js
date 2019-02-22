export default theme => ({
  button: {
    backgroundColor: theme.accentColor,
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.textColorSecondary,
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outlineStyle: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    minHeight: '56px',
    minWidth: '56px',
    '&[disabled]':{
      color: theme.textColorTertiary,
      background: theme.bgColorTertiary,
      border: 'none',
      cursor: 'not-allowed'
    }
  },
});
