export default (theme) => ({
  ViewLinkEditor: {
    width: '240px',
    color: theme.textColorOnBackground,
    padding: '20px',
    fontSize: '14px',
    marginBottom: '80px',
    '&.large': {
      width: '290px'
    },
    '& h3': {
      fontSize: '16px',
      fontWeight: 'normal',
      margin: '0 0 16px 0'
    }
  }
});
