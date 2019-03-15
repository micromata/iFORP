import { NavBarHeight } from '../../components/NavBar/NavBar';

export default theme => ({
  Start: {
    color: theme.textColorOnBackground,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2rem',
    paddingTop: `${NavBarHeight}`,
    '& .newProject': {
      marginTop: '60px',
      padding: '0 80px',
      maxWidth: '600px',
      fontSize: '32px',
      '& button[class^=CircleButton]': {
        zIndex: 1,
        position: 'relative'
      },
      '& .newProjectName': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '380px',
        padding: '26px',
        marginTop: '-28px',
        marginLeft: '28px',
        fontSize: '17px',
        color: theme.textColor,
        background: theme.NewProject.backgroundColor,
        '& input[type=text]': {
          marginBottom: 0
        },
        '& button': {
          marginTop: '26px'
        }
      }
    },
    '& .recentProjects': {
      marginTop: '60px',
      padding: '40px 20px 40px 80px',
      borderTop: '1px solid white',
      maxWidth: '600px',
      fontSize: '32px',
      '& div[class^=ElementGrid]': {
        justifyContent: 'flex-start',
        '& div[class^=ButtonTile]': {
          marginBottom: 0
        }
      }
    },
    '& p': {
      marginTop: 0
    },
    '@media (min-width: 1000px)': {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      '& .newProject': {
        padding: '40px 80px',
      },
      '& .recentProjects': {
        borderTop: 'none',
        borderLeft: '1px solid white',
      }
    },
    '& .ghost': {
      background: 'transparent',
      padding: '0 0 8px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
  },
});
