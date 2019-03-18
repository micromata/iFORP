import { NavBarHeight } from '../NavBar/NavBar';

export default theme => ({
  UserDropdown: {
    position: 'relative',
    '& svg': {
      marginRight: '10px',
    },
    '& .dropdown-toggle': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '0 .5rem',
    },
    '& button[class^=DropdownItem]:first-of-type': {
      borderBottom: '1px solid white',
      paddingBottom: '8px'
    }
  },
  Drop: {
    position: 'absolute',
    top: NavBarHeight,
    right: 0,
    backgroundColor: 'gray',
    padding: '.5rem',
    minWidth: '10rem',
    zIndex: 2
  },
});
