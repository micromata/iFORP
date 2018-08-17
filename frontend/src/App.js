import React, { Component } from 'react';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import injectSheet from 'react-jss';

class App extends Component {
  render() {
    return (
      <div className={'App'}>
        <Router>
          <React.Fragment>
            <NavBar />
            <Route exact path="/" />
            <Route path="/login" component={Login} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const style = theme => ({
  '@global': {
    body: {
      margin: 0,
      backgroundColor: theme.backgroundColor,
    },
    '.toggle': {
      display: 'flex',
      alignItems: 'center',
      '& .toggle-checkbox:checked+.toggle-button::before': {
        left: '24px',
      },

      '& .toggle-button': {
        margin: '0 5px',
        border: '1px solid #E0E0E0',
        borderRadius: '25px',
        boxShadow: 'inset rgba(0,0,0,0.5) 0 3px 3px 0',
        position: 'relative',
        height: '24px',
        width: '48px',
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
});

export default injectSheet(style)(App);
