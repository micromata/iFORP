export default (theme) => ({
  ViewAnnotation: {
    padding: '0',
    margin: '0',
    width: '650px',
    maxHeight: '220px',
    overflow: 'scroll',
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
    '& span': {
      display: 'inline-block',
      fontSize: '14px',
      marginBottom: '10px'
    },
    '& input[type=text]': {
      width: '100%',
      textAlign: 'left'
    },
    '& div[class^=EditableText]': {
      fontSize: '17px',
      '& input[type=text]': {
        fontSize: '17px'
      }
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
  AnnotationNew: {
    width: '100%',
    border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    '& input[type=text]': {
      width: '250px',
    },
    '& textarea': {
      resize: 'none',
      height: '62px'
    }
  }
});
