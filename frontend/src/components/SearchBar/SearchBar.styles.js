export default theme => ({
  SearchBar: {
    minWidth: '360px',
    width: '360px',
    height: '60px',
    zIndex: 10,
    '& input': {
      display: 'inline-block',
      backgroundColor: 'transparent',
      fontSize: '14px',
      color: theme.textColor,
      paddingLeft: '40px',
      height: '40px'
    },
    '& svg': {
      transform: 'scale(0.8)',
      position: 'relative',
      top: '-42px',
      left: '14px',
      '& g': {
        stroke: theme.textColor
      }
    },
    '&.light': {
      '& input': {
        borderColor: theme.textColorOnBackground,
        color: theme.textColorOnBackground
      },
      '& svg g': {
        stroke: theme.textColorOnBackground
      }
    },
  }
});
