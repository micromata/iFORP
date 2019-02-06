export default (theme) => ({
  LibraryFilter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: theme.textColorOnBackground,
    '& input[type=radio]': {
      visibility: 'hidden',
      '&:checked + label': {
        color: theme.accentColor
      }
    },
    '& label': {
      cursor: 'pointer',
      '&:not(:first-of-type)': {
        borderLeft: `1px solid ${theme.textColorOnBackground}`,
        paddingLeft: '20px'
      }
    },
  }
});
