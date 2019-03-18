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
        top: '-122px',
        zIndex: 0
      }
    },
    '& button.btn': {
      backgroundColor: theme.ButtonTile.backgroundColor,
      boxShadow: `0 0 8px 0 rgba(0, 0, 0, 0.50)`,
      border: '1px solid transparent',
      height: '8.25rem',
      width: '11.5rem',
      overflow: 'hidden',
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      padding: 0,
      borderRadius: 0,
      '&:hover': {
        border: `1px solid ${theme.accentColor}`,
        boxShadow: `0 0 8px 0 ${theme.accentColor}`,
      },
      '& img': {
        maxWidth: '11.5rem',
      },
    },
    '&.highlighted': {
      '& button.btn': {
        border: `1px solid ${theme.accentColor}`,
        boxShadow: `0 0 8px 0 ${theme.accentColor}`,
      },
    },
    '&.small': {
      '& button.btn': {
        height: '6.25rem',
        width: '8.5rem',
        '& svg': {
          transform: 'scale(0.7)'
        }
      }
    }
  },
  DeleteButton: {
    position: 'relative',
    top: '150px',
    left: '-44px',
    transform: 'scale(0.7)',
    '& button': {
      backgroundColor: '#666666',
      '&:hover': {
        backgroundColor: theme.accentColor
      }
    }
  },
  ProjectName: {
    color: theme.textColorOnBackground,
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
