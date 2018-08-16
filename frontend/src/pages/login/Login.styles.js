import Grid from "../../assets/img/grid.svg";

export const styles = theme => ({
  Login: {
    '& main': {
      background: `linear-gradient(to bottom, #FFF 0%, #FFF 45%, ${theme.backgroundColor} 45%, ${theme.backgroundColor} 100%)`,
      '& .grid': {
        padding: '30px 50px',
        position: 'relative',
        minHeight: 'calc(100vh - 245px)',
        background: `url(${Grid})`,
        backgroundSize: '22px 22px',
      },
      // backgroundColor: 'transparent',
      minHeight: 'calc(100vh - 245px)',
      '& .logo > img': {
        width: '103px',
      },
    },
    '& footer': {
      backgroundColor: 'white',
      height: '112px',
      padding: '10px',
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
