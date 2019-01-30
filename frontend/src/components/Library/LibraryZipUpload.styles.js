export default (theme) => ({
  LibraryZipUpload: {
    '& input[type=file]': {
      width: '0.1px',
      height: '0.1px',
      opacity: '0',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: '-1',
      '& + label': {
        backgroundColor: '#F9BB1F',
        border: 'none',
        color: '#fff',
        padding: '8px 45px',
        outlineStyle: 'none',
        cursor: 'pointer',
        borderRadius: '100px',
        minWidth: '100%',
        minHeight: '30px',
        display: 'inline-block'
      }
    }
  }
});
