export default theme => ({
  Start: {
    color: theme.textColorSecondary,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '1.5rem',
    justifyContent: 'center',
    height: 'calc(100vh - 53px);',
    '& button': {
      width: '11rem',
      borderRadius: '100px',
      padding: '8px 10px',
    },
    '& .newProjectText, .recentProjectText': {
      marginBottom: '3rem',
      textAlign: 'center',
      '& > p': {
        margin: 0,
      },
    },
    '& .recentProjectText': {
      marginTop: '8rem',
    },
    '& .ghost': {
      position: 'absolute',
      width: '3rem',
      height: '3rem',
      right: '-6rem',
      top: '2.5rem',
    },
  },
});
