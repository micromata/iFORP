export default (theme) => ({
  ViewLinkEditor: {
    width: '480px',
    maxWidth: '48s0px',
    color: theme.textColor,
    backgroundColor: theme.Sidebar.backgroundColor,
    boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.30)',
    padding: '20px',
    fontSize: '14px',
    marginBottom: '80px',
    zIndex: 0,
    '& h3': {
      marginTop: 0,
      marginBottom: '10px',
      fontSize: '25px'
    },
  },
  ImageLinkTeaser: {
    fontSize: '17px',
    lineHeight: '27px'
  }
});
