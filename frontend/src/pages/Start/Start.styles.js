export default () => ({
  Start: {
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '1.5rem',
    padding: '18rem',
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
      }
    },
    '& .newProject': {
      marginBottom: '10rem',
    },
  },
});
