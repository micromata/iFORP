export default (theme) => ({
  LibrarySidebar: {
    backgroundColor: theme.bgColorSecondary,
    width: '520px',
    height: '100vh',
    padding: '40px',
    paddingBottom: '75px',
    overflow: 'scroll',
    boxShadow: '2px 2px 4px 0 rgba(0,0,0,0.50)',
    zIndex: 8,
    transition: 'width 0.3s linear, margin-right 0.3s linear',
    '&.expanded': {
      width: '950px',
      marginRight: '-520px'
    },
    '& h3': {
      marginTop: 0,
      marginBottom: '10px',
      fontSize: '25px'
    },
    '& .UploadButtons': {
      display: 'flex',
      flexWrap: 'wrap',
      '& div': {
        marginRight: '20px',
        marginBottom: '20px'
      }
    }
  },
  ExpandIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
    '& svg': {
      transform: 'rotate(180deg)'
    }
  },
  CollapseIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  LibrarySidebarFilter: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: '20px'
  },
  LibrarySidebarFilename: {
    color: theme.textColor
  },
  LibraryEmptyTeaser: {
    fontSize: '17px',
    lineHeight: '27px',
    '& .footnote': {
      fontSize: '14px'
    }
  }
});
