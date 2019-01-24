export default {
  ButtonTile: {
    '& button.btn': {
      backgroundColor: '#D9D9D9',
      borderRadius: '.5rem',
      height: '8.25rem',
      width: '11.5rem',
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#BCBCBC',
      },
    },
    marginBottom: "2rem"
  },
  DeleteButton: {
    position: 'relative',
    top: '144px',
    left: '-20px',
    '& button': {
      backgroundColor: '#666666'
    }
  },
  ProjectName: {
    color: '#FFF',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    fontSize: '1rem',
  },
};
