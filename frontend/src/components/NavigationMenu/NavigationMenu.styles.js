export default (theme) => ({
  NavigationMenu: {
    position: 'fixed',
    right: '0',
    bottom: '-200px',
    width: '200px',
    backgroundColor: theme.NavigationMenu.backgroundColor,
    color: theme.NavigationMenu.textColor,
    zIndex: '9',
    padding: '20px',
    transition: 'right 0.5s, bottom 0.5s',
    '&.visible': {
      bottom: '0'
    },
    '& ul': {
      listStyle: 'none',
      padding: '0 20px',
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
