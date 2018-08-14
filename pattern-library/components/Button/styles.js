export default {
  button: {
    backgroundColor: '#F9BB1F',
    border: '1px solid #F9BB1F',
    borderRadius: props =>
      props.buttonStyle === 'rounded-corners' ? '8px' : props.buttonStyle === 'round' ? '100px' : 0,
    minHeight: '30px',
    minWidth: props => props.minWidth || 0
  }
};
