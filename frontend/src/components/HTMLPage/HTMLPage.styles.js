import config from '../../config';

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
          width: '100%',
        	'&.desktop': { maxWidth: `${config.viewportWidthDesktop}px` },
        	'&.tablet': { width: `${config.viewportWidthTablet}px` },
        	'&.phone': { width: `${config.viewportWidthPhone}px` },
        }
      }

    }
  }
);
