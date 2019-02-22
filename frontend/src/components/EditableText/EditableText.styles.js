export default (theme) => ({
  EditableText: {
    color: theme.textColorSecondary,
    display: 'inline-block',
    width: '100%',
    '& input[type=text]': {
      'fontSize': '14px',
      'background': 'transparent',
      'color': theme.textColorSecondary,
      'border': `1px dashed ${theme.accentColor}`,
      'padding': '4px',
      'textAlign': 'center',
      'outline': 'none'
    }
  }
});
