import injectSheet from 'react-jss';
import React, { Component } from 'react';
import NavBar from './NavBar';

const style = () => ({
  '@global': {
    body: {
      margin: 0
    }
  },
  button: {
    minHeight: '20px',
    minWidth: '100px',
    background: 'transparent',
    border: '1px solid black',
    borderRadius: '5px'
  }
});

const Button = ({ classes, type = 'button', children }) => (
  <button type={type} className={classes.button}>
    {children}
  </button>
);

const StyledButton = injectSheet(style)(Button);

class App extends Component {
  render() {
    return (
      <div className={'App'}>
        <NavBar />
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get <StyledButton>Started</StyledButton>, edit{' '}
          <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
export default injectSheet(theme => ({
  App: { backgroundColor: theme.backgroundColor }
}))(App);
