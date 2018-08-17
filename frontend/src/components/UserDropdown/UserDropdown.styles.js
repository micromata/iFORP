import { NavBarHeight } from "../NavBar/NavBar";

export default (theme) => ({
  UserDropdown: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& img': {
      marginRight: '10px',
    }
  },
  Drop: {
    position: 'absolute',
    top: NavBarHeight,
    right: 0,
    backgroundColor: 'gray',
    padding: '5px 10px',

    '& ul': {
      listStyle: 'none',
      padding: 0,
      '& li': {
        width: '100%',
      }
    }
  }
})
