export default theme => ({
  SelectWithLabel: {
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
    '& select': {
      height: '40px',
      padding: '0 15px',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      borderRadius: '20px',
      color: '#000000',
      fontSize: '14px',
      backgroundColor: '#868686',
      outline: 'none',
      appearance: 'none',
      '-webkit-appearance': 'none',
      '&:not(.default-value)': {
        backgroundColor: '#5A5A5A',
        border: `1px solid ${theme.accentColor}`,
        color: theme.accentColor
      }
    },
    '& svg': {
      position: 'absolute',
      right: '0',
      marginTop: '16px',
      marginRight: '36px',
      cursor: 'pointer',
      transform: 'scale(1.5, 1.5)'
    }
  }
});
