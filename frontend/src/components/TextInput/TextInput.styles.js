export default theme => ({
  textInput: {
    border: `1px solid ${theme.textColor}`,
    fontSize: '14px',
    borderRadius: '100px',
    outlineStyle: 'none',
    width: '100%',
    minHeight: '35px',
    padding: '0 16px',
    margin: '12px 0',
    '&:focus': {
      border: '2px solid ' + theme.accentColor,
    },
  },
});
