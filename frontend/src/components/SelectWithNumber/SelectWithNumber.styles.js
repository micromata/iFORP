export default theme => ({
  SelectWithNumber: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '16px 0',
    '& label': {
      lineHeight: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
  },
  Number: {
    width: '40px',
    height: '40px',
    textAlign: 'center',
    lineHeight: '40px',
    backgroundColor: theme.accentColor,
    color: theme.textColorOnBackground,
    borderRadius: '50%',
    marginRight: '10px'
  },
  SelectHelper: {
    flexGrow: 1,
    display: 'flex',
    '& select': {
      height: '40px',
      padding: '0 15px',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      borderRadius: '20px',
      color: theme.Select.default.textColor,
      backgroundColor: theme.Select.default.backgroundColor,
      fontSize: '14px',
      outline: 'none',
      appearance: 'none',
      '-webkit-appearance': 'none',
      '&:not(.default-value)': {
        backgroundColor: theme.Select.notDefault.backgroundColor,
        border: `1px solid ${theme.Select.notDefault.borderColor}`,
        color: theme.Select.notDefault.textColor
      }
    },
    '& svg': {
      marginLeft: '-30px',
      marginTop: '16px',
      cursor: 'pointer',
      transform: 'scale(1.5, 1.5)',
    }
  }
});
