import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import injectSheet from 'react-jss';
import { dottedBackground } from './theme';
import ProtectedRoute from './ProtectedRoute';
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
    '*,*:after,*:before': {
      boxSizing: 'border-box',
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
    '.toggle': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .toggle-checkbox:checked+.toggle-button::before': {
        left: '24px',
      },
      '& label.active': {
        color: theme.profiYellow,
      },
      '& .toggle-button': {
        margin: '0 30px',
        border: '1px solid #E0E0E0',
        borderRadius: '25px',
        boxShadow: 'inset rgba(0,0,0,0.5) 0 3px 3px 0',
        position: 'relative',
        height: '26px',
        width: '50px',
        '&:before': {
          content: '""',
          padding: '12px',
          backgroundColor: theme.profiYellow,
          position: 'absolute',
          borderRadius: '15px',
          boxShadow: 'rgba(0,0,0,0.5) 0 1px 3px 0',
          transition: 'left 0.25s',
          transitionTimingFunction: 'linear',
          left: 0,
        },
      },
      '& input': {
        display: 'none',
      },
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
