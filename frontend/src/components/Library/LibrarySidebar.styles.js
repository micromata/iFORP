export default (theme) => ({
  LibrarySidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '240px',
    color: theme.textColorLight,
    padding: '20px',
    fontSize: '14px',
    borderRight: `1px solid ${theme.textColorLight}`,
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
