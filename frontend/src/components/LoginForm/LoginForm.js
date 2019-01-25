import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Card from '../Card/Card';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Toggle from '../Toggle/Toggle';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'signIn',
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
        <Toggle
          labelLeft="Sign In"
          labelRight="Sign Up"
          isActive={this.state.mode === 'signIn'}
          onToggle={enabled => {
            this.setState({ mode: enabled === true ? 'signIn' : 'signUp' });
          }}
        />
        {this.state.mode === 'signIn' && (
          <SignInForm handleSignIn={this.props.handleSignIn} error={this.props.signInError} />
        )}
        {this.state.mode === 'signUp' && (
          <SignUpForm handleSignUp={this.props.handleSignUp} error={this.props.signUpError} />
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

export default injectSheet(styles)(LoginForm);
