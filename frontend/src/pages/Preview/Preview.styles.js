export default () => ({
  Preview: {
    height: '100%',
    width: '100%',
    '& .nav-bar': {
      margin: 0
    },
    '& main': {
      height: 'calc(100% - 120px)',
      display: 'flex',
      alignItems: 'stretch',
      '& .content': {
        flexGrow: 1,
        '& .preview-wrapper': {
          padding: '0 0 100vh 0',
          margin: 0
        }
      }
    }
  }
});
