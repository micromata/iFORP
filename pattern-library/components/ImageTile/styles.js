export default theme => ({
  tile: {
    display: 'flex',
    flexDirection: 'column',
    margin: '15px'
  },
  tileImageArea: {
    position: 'relative',
  },
  tileOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
