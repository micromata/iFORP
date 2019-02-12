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
        '& .preview-wrapper': {
          height: '100vh',
          flexShrink: 0,
          flexGrow: 1,
          '&.desktop': { maxWidth: '1280px' },
        	'&.tablet': { maxWidth: '768px' },
        	'&.phone': { maxWidth: '375px' }
        },
        '& .annotation-panel': {
          padding: '20px',
          flexShrink: 0,
          flexGrow: 1,
          width: '400px',
          maxWidth: '400px',
          maxHeight: '100vh',
          overflow: 'scroll',
          '& h3': {
            color: theme.textColorOnBackground,
            textAlign: 'center'
          }
        }
      }
    }
  }
});
