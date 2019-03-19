import config from '../../config';

export default () => ({
  HTMLPage: {
    '&.preview-wrapper': {
      height: '100%',
    	marginBottom: '100px',
    	position: 'relative',
      '& .preview': {
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
