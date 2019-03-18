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
      cursor: 'pointer',
      width: '100%',
      borderRadius: '20px',
      color: theme.textColor,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.textColor}`,
      fontSize: '14px',
      outline: 'none',
      appearance: 'none',
      '-webkit-appearance': 'none',
      zIndex: 1
    },
    '& svg': {
      marginLeft: '-30px',
      marginTop: '16px',
      cursor: 'pointer',
      transform: 'scale(1.5, 1.5)',
      zIndex: 0
    }
  }
});
