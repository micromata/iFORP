export default (theme) => ({
  EditNewViewAnnotation: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& input[type=text]': {
      marginTop: 0,
      '&:first-of-type': {
        width: '50%'
      }
    }
  },
  Buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    '& button': {
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      background: 'transparent',
      color: theme.ViewAnnotationPanel.textColor,
      '&:hover, &:active, &:focus': {
        color: theme.accentColor
      }
    }
  }
});
