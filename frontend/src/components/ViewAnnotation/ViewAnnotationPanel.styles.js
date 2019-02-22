export default (theme) => ({
  ViewAnnotationPanel: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'fixed',
    padding: '20px 20px',
    color: theme.textColorPrimary,
    backgroundColor: theme.ButtonBar.backgroundColor,
    boxShadow: '0 -2px 6px 0 rgba(0,0,0,0.20)',
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
      transform: 'rotate(180deg)',
    },
    '& i': {
      color: theme.textColorPrimary
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
