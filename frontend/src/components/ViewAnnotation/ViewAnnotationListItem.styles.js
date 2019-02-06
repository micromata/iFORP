export default (theme) => ({
  ViewAnnotationListItem: {
    margin: '20px 0',
    color: theme.textColorOnBackground,
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    '&:before': {
      counterIncrement: 'annotationCounter',
      content: 'counter(annotationCounter)',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: '30px',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: theme.accentColor,
      lineHeight: '30px',
      marginRight: '20px'
    },
  },
  AnnotationText: {
    paddingTop: '4px',
    flexGrow: 1,
    '& input[type=text]': {
      width: '100%',
      textAlign: 'left'
    }
  },
  DeleteButton: {
    cursor: 'pointer',
    margin: '4px 12px 0',
    '& svg g': {
      stroke: theme.textColor
    },
    '&:hover svg g': {
      stroke: theme.accentColor
    }
  },
});
