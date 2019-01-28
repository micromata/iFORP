export default (theme) => ({
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
    '& button': {
      marginTop: '-40px'
    }
  }
});
