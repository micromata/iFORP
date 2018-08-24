import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import injectSheet from 'react-jss';
import { dottedBackground } from './theme';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Start from './pages/Start/Start';

class App extends Component {
  render() {
    return (
      <div className={`${this.props.classes.App} App`}>
        <Router>
          <React.Fragment>
            <ProtectedRoute exact path="/" component={Start} />
            <Route path="/login" component={Login} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const style = theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    'html,body,#root,.App': {
      height: '100%',
      width: '100%',
    },
    body: {
      margin: 0,
      backgroundColor: theme.backgroundColor,
      fontFamily: 'Verdana',
    },
  },
  App: {
    ...dottedBackground(
      theme.DottedBackground.backgroundColor,
      theme.DottedBackground.dotColor,
      '22px',
      '2px'
    ),
  },
});

export default injectSheet(style)(App);
