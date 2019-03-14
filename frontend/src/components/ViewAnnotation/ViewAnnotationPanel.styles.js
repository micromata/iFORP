export default (theme) => ({
  ViewAnnotationPanel: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'fixed',
    padding: '20px 20px',
    color: theme.textColor,
    backgroundColor: theme.ButtonBar.backgroundColor,
    boxShadow: '0 -2px 6px 0 rgba(0,0,0,0.20)',
    bottom: 0,
    zIndex: 10,
    height: '96px',
    transition: 'height 0.3s ease',
    '&.visible': {
      height: '220px',
      '& button[class^=CircleButton] svg': {
        transform: 'rotate(0deg)'
      }
    },
    '& button[class^=CircleButton]': {
      position: 'relative',
      top: '-44px',
      '& svg': {
        transform: 'rotate(180deg)'
      }
    }
  },
  Buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& label[for=toggle]': {
      fontWeight: 'bold'
    },
    '& .toggle-button': {
      margin: '0 22px 0 0'
    }
  },
});
