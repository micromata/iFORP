export default (theme) => ({
  LibraryTreeView: {
    width: '240px',
    color: theme.textColorOnBackground,
    padding: '20px',
    fontSize: '14px',
    borderRight: `1px solid ${theme.textColorOnBackground}`,
    userSelect: 'none',
    marginBottom: '80px',
    '& ul': {
      listStyle: 'none',
      margin: '0',
      padding: '0'
    },
    '& li': {
      padding: '6px 0',
      cursor: 'pointer'
    },
    '& li svg': {
      width: '20px',
      marginRight: '4px'
    },
    '& li ul': {
      margin: '10px 0 10px 30px'
    }
  }
});
