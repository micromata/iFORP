export default theme => ({
  ButtonTile: {
    marginBottom: '2rem',
    zIndex: 1,
    '&.ConnectRight': {
      '&::after': {
        content: '""',
        width: '36px',
        height: '5px',
        backgroundColor: theme.accentColor,
        display: 'inline-block',
        position: 'relative',
        right: '-184px',
        top: '-116px',
        zIndex: 0
      }
    },
    '& button.btn': {
      backgroundColor: '#D9D9D9',
      height: '8.25rem',
      width: '11.5rem',
      overflow: 'hidden',
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: 'none',
      padding: 0,
      borderRadius: 0,
      '&:hover': {
        backgroundColor: '#BCBCBC'
      },
      '& img': {
        maxWidth: '11.5rem',
      }
    }
  },
  DeleteButton: {
    position: 'relative',
    top: '150px',
    left: '-44px',
    transform: 'scale(0.7)',
    '& button': {
      backgroundColor: '#666666'
    }
  },
  ProjectName: {
    color: theme.textColorSecondary,
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    fontSize: '14px',
    userSelect: 'none',
    textAlign: 'center',
    lineHeight: '28px',
  },
});
