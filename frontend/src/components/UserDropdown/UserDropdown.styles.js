import { NavBarHeight } from '../NavBar/NavBar';

export default theme => ({
  UserDropdown: {
    position: 'relative',
    '& img': {
      marginRight: '10px',
    },
    '& .dropdown-toggle': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '0 .5rem',
    },
  },
  Drop: {
    position: 'absolute',
    top: NavBarHeight,
    right: 0,
    backgroundColor: 'gray',
    padding: '.5rem',
    minWidth: '10rem',
  },
});
