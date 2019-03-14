export default () => ({
  Login: {
    width: '100%',
    backgroundImage: 'linear-gradient(to bottom, white, white 430px, transparent 431px)'
  },
  LoginMain: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Hero: {
    backgroundColor: 'transparent',
    paddingTop: '25px',
    paddingLeft: '180px',
    paddingBottom: '65px',
  },
  HeroText: {
    color: '#5E5E5E',
    fontSize: '25px'
  },
  IforpBrand: {
    marginBottom: '120px',
  },
  Footer: {
    width: '100%',
    height: '112px',
    fontSize: '12px',
    color: '#5E5E5E',
    backgroundColor: '#fff',
    padding: '0 180px',
    '@media (min-height: 750px)': {
      bottom: 0,
      left: 0,
      position: 'fixed',
    }
  },
  Promoters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
  },
  PromoterLogo: {
    height: '52px',
    maxHeight: '52px',
  },
});
