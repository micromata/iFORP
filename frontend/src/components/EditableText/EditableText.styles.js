export default (theme) => ({
  EditableText: {
    color: theme.textColor,
    display: 'inline-block',
    width: '100%',
    fontSize: '14px',
    '& input[type=text]': {
      '&:not([class^=TextInput])': {
        'fontSize': '14px',
        'background': 'transparent',
        'color': theme.textColor,
        'border': `1px dashed ${theme.accentColor}`,
        'padding': '4px',
        'textAlign': 'center',
        'outline': 'none'
      },
      '&[class^=TextInput]': {
        marginTop: 0
      }
    },
    '&.Secondary': {
      color: theme.textColorOnBackground,
      '& input[type=text]': {
        'color': theme.textColorOnBackground,
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
      '&:hover, &:active, &:focus': {
        color: theme.accentColor
      }
    }
  }
});
