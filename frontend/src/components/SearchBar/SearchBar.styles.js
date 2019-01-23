export default (theme) => ({
  SearchBar: {
    width: '100%',
    height: '60px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '-30px',
    padding: '40px 80px',
    zIndex: 10,
    '& input': {
      backgroundColor: 'transparent',
      maxWidth: '250px',
      marginLeft: '40px',
      color: 'white'
    }
  }
});
