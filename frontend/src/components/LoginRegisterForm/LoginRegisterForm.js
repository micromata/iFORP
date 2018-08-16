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
        <div className={this.props.classes.FormSwitch}>
          <span
            className={`${this.props.classes.FormSelect} ${
              this.state.mode === 'login' ? ' active' : ''
            }`}
            onClick={() => this.setState({ mode: 'login' })}
          >
            Login
          </span>
          <span className={this.props.classes.Divider}>|</span>
          <span
            className={`${this.props.classes.FormSelect} ${
              this.state.mode === 'register' ? ' active' : ''
            }`}
            onClick={() => this.setState({ mode: 'register' })}
          >
            Register
          </span>
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
