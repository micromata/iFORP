import React, { Component } from 'react';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Footer from './Footer';
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
            <Footer />
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
  },
});

export default injectSheet(style)(App);
