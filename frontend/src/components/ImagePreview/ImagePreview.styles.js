export default (theme) => ({
  ImagePreview: {
    '&.preview-wrapper': {
      '&.desktop': { width: '1280px' },
      '&.tablet': { width: '768px' },
      '&.phone': { width: '375px' },
      '& .preview': {
        	border: '1px solid gray'
        }
      }
    }
  }
);
