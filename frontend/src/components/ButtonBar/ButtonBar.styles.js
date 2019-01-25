export default () => ({
  ButtonBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    padding: '20px 20px',
    backgroundColor: 'rgba(100, 100, 100, 0.9)',
    bottom: 0,
    zIndex: 10,
    '& div:empty': {
      minWidth: '56px'
    },
    '& button': {
      marginTop: '-40px'
    }
  }
});
