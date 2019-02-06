export default (theme) => ({
  EditableText: {
    display: 'inline-block',
    width: '100%',
    '& input[type=text]': {
      'fontSize': '16px',
      'background': 'transparent',
      'color': theme.textColorLight,
      'border': `1px dashed ${theme.accentColor}`,
      'padding': '4px',
      'textAlign': 'center',
      'outline': 'none'
    }
  }
});
