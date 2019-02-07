export default () => ({
  View: {
    height: '100%',
    width: '100%',
    '& main': {
      height: 'calc(100% - 120px)',
      display: 'flex',
      alignItems: 'stretch',
      '& .content': {
        padding: '20px',
        display: 'flex',
        '& .preview-wrapper': {
          height: '100vh',
          flexShrink: 0,
          '&.desktop': { width: '1280px' },
        	'&.tablet': { width: '768px' },
        	'&.phone': { width: '375px' }
        },
      }
    }
  }
});
