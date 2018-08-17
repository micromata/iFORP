export default {
  button: {
    backgroundColor: '#F9BB1F',
    border: '1px solid #F9BB1F',
    fontSize: '18px',
    color: '#fff',
    padding: '8px 45px',
    outlineStyle: 'none',
    cursor: 'pointer',
    borderRadius: props =>
      props.buttonStyle === 'rounded-corners'
        ? '8px'
        : props.buttonStyle === 'round'
          ? '100px'
          : 0,
    minHeight: '30px',
    minWidth: props => props.minimumWidth || 0,
    '&[disabled]':{
      background: '#555',
      border: 'none',
      cursor: 'not-allowed'
    }
  },
};
