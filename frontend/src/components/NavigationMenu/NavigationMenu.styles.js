export default (theme) => ({
  NavigationMenu: {
    position: 'fixed',
    right: '0',
    bottom: '-400px',
    backgroundColor: theme.NavigationMenu.backgroundColor,
    color: theme.NavigationMenu.textColor,
    zIndex: '9',
    padding: '20px',
    minWidth: '230px',
    transition: 'bottom ease-out 0.75s',
    '&.visible': {
      bottom: '0'
    },
    '& ul': {
      maxHeight: '300px',
      overflow: 'scroll',
      padding: '0 20px',
      listStyle: 'none',
      '& li': {
        margin: '10px 0',
        '& a': {
          textDecoration: 'none',
          color: theme.NavigationMenu.textColor,
          outline: 'none',
          '&:hover, &:active, &:focus': {
            color: theme.NavigationMenu.accentColor
          }
        }
      }
    }
  },
  CloseButton: {
    marginBottom: '-60px',
    position: 'relative',
    top: '-40px',
    left: '-40px'
  },
});
