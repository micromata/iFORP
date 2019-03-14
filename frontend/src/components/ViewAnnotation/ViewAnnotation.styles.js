export default (theme) => ({
  ViewAnnotation: {
    padding: '0 20px',
    width: '650px',
    maxHeight: '200px',
    overflow: 'scroll',
    marginTop: '-40px',
    margin: '20px 0',
    color: theme.textColor,
    display: 'flex',
    alignItems: 'flex-start',
  },
  AnnotationBubble: {
    textAlign: 'center',
    minWidth: '40px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    color: theme.Button.textColor,
    background: theme.accentColor,
    lineHeight: '40px',
    marginRight: '20px'
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
