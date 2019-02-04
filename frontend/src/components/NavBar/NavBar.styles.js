import { NavBarHeight } from "./NavBar";

export default (theme) => ({
  NavBar: {
    backgroundColor: theme.NavBar.backgroundColor,
    width: '100%',
    height: NavBarHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30px',
    zIndex: 10,
  },
  NavItem: {
    display: 'flex',
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
      height: '100%',
    },
  },
  BackNavigation: {
    height: '100%',
  },
});
