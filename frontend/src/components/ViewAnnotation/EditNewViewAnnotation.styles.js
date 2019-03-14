export default (theme) => ({
  EditNewViewAnnotation: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& input[type=text], textarea': {
      width: '250px',
      boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.50)',
      border: 'none',
      padding: '0 20px',
      lineHeight: '27px',
      fontSize: '17px',
      marginBottom: '3px',
      color: theme.textColor,
      outline: 'none'
    },
    '& textarea': {
      width: '100%',
      resize: 'none',
      height: '62px'
    }
  }
});
