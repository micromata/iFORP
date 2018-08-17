export default (theme) => ({
  NavBar: {
    backgroundColor: theme.NavBar.backgroundColor,
    width: '100%',
    height: '53px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NavItem: {
    display: 'flex',
    flexBasis: '30%',
    padding: '0 18px',
    justifyContent: 'center',
    color: theme.NavBar.textColor,
    textDecoration: 'none',
    '& a': {
      textDecoration: 'none',
      color: theme.NavBar.textColor,
    },
    '&.nav-left': {
      justifyContent: 'flex-start',
    },
    '&.nav-center': {
      fontSize: '18px',
    },
    '&.nav-right': {
      justifyContent: 'flex-end',
      fontSize: '12px',
      '&.account-settings': {},
    },
  },
  AccountActions: {
    padding: '0 8px',
  },
  BackNavigation: {
    height: '100%',
  },
});
