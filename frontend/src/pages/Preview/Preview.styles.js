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
          '&.desktop': { width: '1280px' },
        	'&.tablet': { width: '768px' },
        	'&.phone': { width: '375px' }
        },
        '& .annotation-panel': {
          padding: '20px',
          flexShrink: 0,
          flexGrow: 1,
          minWidth: '280px',
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
