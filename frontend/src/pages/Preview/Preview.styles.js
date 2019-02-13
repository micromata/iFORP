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
        marginBottom: '80px',
        '&.WithAnnotations': {
          marginBottom: '220px'
        },
        '& .preview-wrapper': {
          height: '100vh',
          flexShrink: 0,
          flexGrow: 1,
          '&.desktop': { maxWidth: '1280px' },
        	'&.tablet': { maxWidth: '768px' },
        	'&.phone': { maxWidth: '375px' }
        }
      }
    }
  }
});
