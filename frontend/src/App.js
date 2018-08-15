import injectSheet from 'react-jss';
import React, { Component } from 'react';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './pages/login/Login';

const style = () => ({
  button: {
    minHeight: '20px',
    minWidth: '100px',
    border: '1px solid black',
    borderRadius: '5px'
  }
});

const Button = ({ classes, type = 'button', children, click }) => (
  <button type={type} onClick={click} className={classes.button}>
    {children}
  </button>
);

const StyledButton = injectSheet(style)(Button);

class App extends Component {
  render() {
    return (
      <div className={'App'}>
        <Router>
          <React.Fragment>
            <NavBar />
            <Route exact path="/" component={StyledButton} />
            <Route path="/login" component={Login} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}
export default injectSheet(theme => ({
  App: { backgroundColor: theme.backgroundColor }
}))(App);
