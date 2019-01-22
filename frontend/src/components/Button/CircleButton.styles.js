export default {
  button: {
    backgroundColor: '#F9BB1F',
    border: 'none',
    fontSize: '18px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outlineStyle: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    minHeight: '56px',
    minWidth: '56px',
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
      border: 'none'
    }
  },
};
