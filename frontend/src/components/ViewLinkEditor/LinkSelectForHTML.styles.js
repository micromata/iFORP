export default theme => ({
  LinkSelectForHTML: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 0',
    '& label': {
      lineHeight: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  SelectHelper: {
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
