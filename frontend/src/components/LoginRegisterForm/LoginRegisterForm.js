import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Card from '../Card/Card';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class LoginRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'login',
    };
  }

  render() {
    return (
      <Card
        position={'absolute'}
        top={'150px'}
        right={'150px'}
        width={'420px'}
        height={'620px'}
      >
        <div className="toggle">
          <label htmlFor="sign" className={this.state.mode === 'login' ? 'active' : ''}>Sign In</label>
          <input
            type="checkbox"
            className="toggle-checkbox"
            name="sign"
            id="sign"
            onChange={() => this.setState(() => {
              debugger
              return {mode: this.state.mode === 'login' ? 'register' : 'login'}
            })}
          />
          <label htmlFor="sign" className="toggle-button" />
          <label htmlFor="sign" className={this.state.mode === 'register' ? 'active' : ''}>Sign Up</label>
        </div>
        {this.state.mode === 'login' && (
          <LoginForm handleLogin={this.props.handleLogin} />
        )}
        {this.state.mode === 'register' && (
          <RegisterForm handleRegister={this.props.handleRegister} />
        )}
      </Card>
    );
  }
}

const styles = theme => ({
  FormSwitch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 60px',
    '& .active': {
      color: theme.accentColor,
    },
  },
  FormSelect: {
    fontSize: '18px',
    cursor: 'pointer',
    userSelect: 'none',
  },
});

export default injectSheet(styles)(LoginRegisterForm);
