export default {
  button: {
    backgroundColor: '#EE9A02',
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    userSelect: 'none',
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
