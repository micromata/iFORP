export default () => ({
  Library: {
    height: '100%',
    width: '100%',
    '& main': {
      height: 'calc(100% - 120px)',
      display: 'flex',
      alignItems: 'stretch',
      '& .content': {
        padding: '20px',
        flexGrow: 1
      }
    }
  }
});
