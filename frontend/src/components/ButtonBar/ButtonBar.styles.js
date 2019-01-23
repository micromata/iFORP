export default () => ({
  ButtonBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    padding: '0 20px 20px 20px',
    bottom: 0,
    zIndex: 10,
    '& div:empty': {
      minWidth: '56px'
    }
  }
});
