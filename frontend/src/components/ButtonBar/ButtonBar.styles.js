export default () => ({
  ButtonBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    padding: '0 20px 20px 20px',
    bottom: 0,
    zIndex: 10
  },
  ButtonBarItem: {
    display: 'flex',
    flexBasis: '30%',
    padding: '0 18px',
    justifyContent: 'center',
    textDecoration: 'none',
    '& a': {
      textDecoration: 'none'
    },
    '&.button-left': {
      justifyContent: 'flex-start'
    },
    '&.button-center': {
      fontSize: '18px'
    },
    '&.button-right': {
      justifyContent: 'flex-end',
      fontSize: '12px',
      height: '100%'
    }
  }
});
