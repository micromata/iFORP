export default theme => ({
  FilterChip: {
    height: '28px',
    lineHeight: '28px',
    padding: '0 16px',
    fontSize: '12px',
    borderRadius: '14px',
    userSelect: 'none',
    color: theme.FilterChip.textColor,
    backgroundColor: theme.FilterChip.backgroundColor,
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
    '&.checked': {
      color: theme.FilterChip.textColorChecked,
      backgroundColor: theme.FilterChip.backgroundColorChecked,
    },
    '& svg': {
      marginRight: '8px'
    }
  },
});
