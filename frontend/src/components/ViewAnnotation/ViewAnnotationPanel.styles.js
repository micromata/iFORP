export default (theme) => ({
  ViewAnnotationPanel: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'fixed',
    padding: '20px 20px',
    backgroundColor: theme.ButtonBar.backgroundColor,
    bottom: 0,
    visibility: 'visible',
    zIndex: 10,
    '&.visible': {
      height: '220px',
      '& button[class^=CircleButton]': {
        transform: 'rotate(0deg)'
      }
    },
    '& button[class^=CircleButton]': {
      position: 'relative',
      top: '-44px',
      marginBottom: '-44px',
      transform: 'rotate(180deg)',
    },
    '& i': {
      color: theme.textColorOnBackground,
    },
  },
  Buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& div:empty': {
      width: '200px'
    },
  },
});
