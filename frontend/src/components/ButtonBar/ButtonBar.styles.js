export default theme => ({
  ButtonBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    padding: '20px 20px',
    backgroundColor: theme.ButtonBar.backgroundColor,
    boxShadow: '0 -2px 6px 0 rgba(0,0,0,0.20)',
    bottom: 0,
    visibility: 'visible',
    transition: 'bottom 0.5s, visibility 0.5s',
    '& .ButtonsLeft': {
      width: '50vw',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    '& .ButtonsCenter': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .ButtonsRight': {
      width: '50vw',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    zIndex: 10,
    '&.fade': {
      bottom: '-80px',
      visibility: 'hidden'
    },
    '&.pullUp button[class^=CircleButton]': {
      marginTop: '-46px'
    }
  }
});
