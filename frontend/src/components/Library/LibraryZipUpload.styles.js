export default theme => ({
  LibraryZipUpload: {
    display: 'inline-block',
    margin: '10px 20px 10px 0',
    '& input[type=file]': {
      width: '0.1px',
      height: '0.1px',
      opacity: '0',
      overflow: 'hidden',
      position: 'absolute',
      userSelect: 'none',
      zIndex: '-1',
      '& + label': {
        backgroundColor: theme.bgColorPrimary,
        color: theme.textColorSecondary,
        border: 'none',
        fontWeight: 'bold',
        padding: '8px 45px',
        outlineStyle: 'none',
        cursor: 'pointer',
        borderRadius: '100px',
        minWidth: '100%',
        minHeight: '30px',
        display: 'inline-block'
      }
    },
    '&.highlighted input[type=file] + label': {
      backgroundColor: theme.accentColor,
      color: theme.textColorSecondary
    }
  }
});
