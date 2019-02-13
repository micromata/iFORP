export default theme => ({
  Preview: {
    height: '100%',
    width: '100%',
    '& .nav-bar': {
      margin: 0
    },
    '& main': {
      '& .content': {
        display: 'flex',
        justifyContent: 'center',
        '& .preview-wrapper': {
          height: '100vh',
          flexShrink: 0,
          flexGrow: 1,
          '&.desktop': { maxWidth: '1280px' },
        	'&.tablet': { maxWidth: '768px' },
        	'&.phone': { maxWidth: '375px' }
        }
      },
      '& .annotation-panel': {
        padding: '20px',
        width: '100%',
        overflow: 'scroll',
        height: '200px',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: theme.ButtonBar.backgroundColor,
        '& button[class^=CircleButton]': {
          position: 'relative',
          top: '-30px',
          zIndex: 10
        }
      }
    }
  }
});
