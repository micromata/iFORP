import React, { Component } from 'react';
import injectSheet from 'react-jss';
import NotFoundSvg from '../../assets/img/not-found';

class PageNotFound extends Component {
  render() {
    return (
      <div className={ this.props.classes.PageNotFound }>
        <NotFoundSvg />
        <a href="/">zur Startseite</a>
      </div>
    );
  }
}

const styles = theme => ({
  PageNotFound: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    '& svg': {
      height: '70vh'
    },
    '& a': {
      fontSize: '36px',
      color: theme.textColorOnBackground,
      textDecoration: 'none',
      '&:hover, &:active, &:focus': {
        color: theme.accentColor
      }
    }
  },
});

export default injectSheet(styles)(PageNotFound);
