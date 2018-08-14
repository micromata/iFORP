import React from 'react';

const styles = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.header.background,
    color: theme.primaryText,
    padding: '0 18px',
    height: '46px'
  },
  headerTitle: {
    fontSize: '18px',
    color: '#ffffff'
  },
  headerCloseIcon: {
    fontSize: '24px'
  },
  headerDropDownIcons: {
    fontSize: '18px',
    paddingRight: '5px'
  }
});

export default styles;
