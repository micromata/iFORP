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
    bottom: 0,
    visibility: 'visible',
    transition: 'bottom 0.5s, visibility 0.5s',
    zIndex: 10,
    '&.fade': {
      bottom: '-80px',
      visibility: 'hidden'
    },
    '& div:empty': {
      minWidth: '56px'
    },
    '& button[class^=CircleButton]': {
      marginTop: '-40px',
      '&.ghost': {
        marginTop: 0,
        backgroundColor: theme.ButtonBar.backgroundColorGhost,
        '& svg g': { stroke: '#E9E9E9' },
        '&:hover:not(:disabled)': {
          backgroundColor: theme.accentColor,
          '& svg g': { stroke: '#FFF' },
        }
      }
    }
  }
});
