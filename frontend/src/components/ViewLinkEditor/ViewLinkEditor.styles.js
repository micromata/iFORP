export default (theme) => ({
  ViewLinkEditor: {
    width: '400px',
    maxWidth: '400px',
    color: theme.textColorPrimary,
    backgroundColor: theme.bgColorSecondary,
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
