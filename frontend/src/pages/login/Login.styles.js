import Grid from '../../assets/img/grid.svg';

export const styles = theme => ({
  Login: {
    '& main': {
      height: 'calc(100vh - 167px)',
      background: `linear-gradient(to bottom, #FFF 0%, #FFF 45%, ${
        theme.backgroundColor
      } 45%, ${theme.backgroundColor} 100%)`,
      '& .grid': {
        position: 'relative',
        height: '100%',
        background: `url(${Grid})`,
        backgroundSize: '22px 22px',
        '& .introducing-section': {
          backgroundColor: 'white',
          width: '60%',
          height: '45%',
          '& .introducing-container': {
            padding: '30px 160px 30px 50px',
          },
        },
      },
    },
    '& .logo > img': {
      width: '103px',
    },
    '& .login-container': {
      backgroundColor: 'white',
      position: 'absolute',
      top: '100px',
      right: '20%',
      boxShadow: 'black 0px 2px 12px',
      padding: '40px 50px',
      width: '400px',
      height: '600px',
      boxSizing: 'border-box'
    },
    '& .login-form': {
    },
    '& footer': {
      backgroundColor: 'white',
      height: '112px',
      padding: '10px',
      boxSizing: 'border-box',
      '& p': {
        margin: 0,
        fontSize: '12px',
        color: '#5e5e5e',
      },
      '& .promoters': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > div': {
          display: 'flex',
          alignItems: 'center',
          width: '135px',
          height: '90px',
          '& > img': {
            width: '123px',
          },
        },
      },
    },
  },
});
