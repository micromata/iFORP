export default (theme) => ({
  EditableName: {
    '& input[type=text]': {
      'fontSize': '16px',
      'background': 'transparent',
      'color': theme.textColorLight,
      'border': '1px dashed #F9BB1F',
      'padding': '4px',
      'textAlign': 'center',
      'outline': 'none'
    }
  }
});
