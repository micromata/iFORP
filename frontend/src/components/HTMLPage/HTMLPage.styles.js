export default (theme) => ({
  HTMLPage: {
    '&.preview-wrapper': {
      height: '0',
    	marginBottom: '15px',
    	position: 'relative',
    	padding: '0 0 75vh 0',
      '& .preview': {
        	border: '1px solid gray',
        	position: 'absolute',
        	top: '0',
        	left: '0',
        	right: '0',
        	margin: 'auto',
        	height: '100%',
        	'&.desktop': { width: '1280px' },
        	'&.tablet': { width: '768px' },
        	'&.phone': { width: '375px' }
        }
      }

    }
  }
);
