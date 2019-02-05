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
          '& h3': {
            color: theme.textColorLight,
            textAlign: 'center'
          },
          '& ul.annotations': {
            margin: 0,
            padding: 0,
            counterReset: 'annotationCounter',
            listStyle: 'none',
            '& li.annotation': {
              margin: '10px 0',
              color: theme.textColorLight,
              '&:before': {
                counterIncrement: 'annotationCounter',
                content: 'counter(annotationCounter)',
                display: 'inline-block',
                textAlign: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: theme.accentColor,
                lineHeight: '30px',
                marginRight: '20px'
              },
            }
          }
        }
      }
    }
  }
});
