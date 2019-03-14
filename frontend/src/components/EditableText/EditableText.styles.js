export default (theme) => ({
  EditableText: {
    color: theme.textColor,
    display: 'inline-block',
    width: '100%',
    fontSize: '17px',
    '& input[type=text]': {
      'fontSize': '17px',
      'background': 'transparent',
      'color': theme.textColor,
      'border': `1px dashed ${theme.accentColor}`,
      'padding': '4px',
      'textAlign': 'center',
      'outline': 'none'
    },
    '&.Secondary': {
      color: theme.textColorOnBackground,
      '& input[type=text]': {
        'color': theme.textColorOnBackground,
      }
    }
  }
});
