const styles = theme => ({
  text: {
    fontFamily: 'Verdana',
    color: theme.primaryText,
    fontSize: props => props.fontSize || '14px',
    letterSpacing: 0,
    textAlign: 'left',
    marginBottom: props => props.marginBottom || '',
    marginLeft: props => props.marginLeft || ''
  }
});

export default styles;
