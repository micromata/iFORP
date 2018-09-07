import React, { Component } from 'react';
import injectSheet from 'react-jss';

class PageNotFound extends Component {
  render() {
    return (
      <h1 className={this.props.classes.PageNotFound}>404 Page not found</h1>
    );
  }
}

const styles = theme => ({
  PageNotFound: {
    color: 'white',
  },
});

export default injectSheet(styles)(PageNotFound);
