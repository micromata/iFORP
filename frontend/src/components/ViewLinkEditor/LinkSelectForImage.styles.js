export default theme => ({
  LinkSelectForImage: {
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
    minWidth: '40px',
    minHeight: '40px',
    textAlign: 'center',
    lineHeight: '40px',
    backgroundColor: theme.accentColor,
    color: theme.Button.textColor,
    borderRadius: '50%',
    marginRight: '10px'
  },
  SelectHelper: {
    flexGrow: 1,
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
      zIndex: 0,
    }
  },
  DeleteButton: {
    cursor: 'pointer',
    marginLeft: '12px',
    '& svg g': {
      stroke: theme.textColor
    },
    '&:hover svg g': {
      stroke: theme.accentColor
    }
  }
});
