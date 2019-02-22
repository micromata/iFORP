export default (theme) => ({
  EditableText: {
    color: theme.textColorPrimary,
    display: 'inline-block',
    width: '100%',
    '& input[type=text]': {
      'fontSize': '14px',
      'background': 'transparent',
      'color': theme.textColorPrimary,
      'border': `1px dashed ${theme.accentColor}`,
      'padding': '4px',
      'textAlign': 'center',
      'outline': 'none'
    },
    '&.Secondary': {
      color: theme.textColorSecondary,
      '& input[type=text]': {
        'color': theme.textColorSecondary,
      }
    }
  }
});
