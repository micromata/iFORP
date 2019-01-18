export default {
  button: {
    backgroundColor: '#F9BB1F',
    border: 'none',
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
    '&:hover':{
      backgroundColor: '#FFB600',
    },
    '&[disabled]':{
      background: '#FCDD8F',
      border: 'none',
      cursor: 'not-allowed'
    },
    '&.ghost': {
      backgroundColor: 'transparent',
      border: 'none',

    }
  },
};
