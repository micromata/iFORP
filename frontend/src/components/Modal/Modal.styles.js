export default (theme) => ({
  ModalBackground: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    background: theme.Modal.backgroundColor,
    zIndex: 999999999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Modal: {
    width: '480px',
    background: '#FFF',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ModalHeader: {
    textAlign: 'center',
    paddingBottom: '20px',
    fontWeight: 'bold',
    borderBottom: '1px solid gray',
    userSelect: 'none',
  },
  ModalBody: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '20px 0',
    userSelect: 'none',
  },
  ModalFooter: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});
