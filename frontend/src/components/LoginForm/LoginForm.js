import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Card from '../Card/Card';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import classnames from 'classnames';

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
        <div className="toggle">
          <label
            htmlFor="sign"
            className={classnames({
              active: this.state.mode === 'signIn',
            })}
          >
            Sign In
          </label>
          <input
            type="checkbox"
            className="toggle-checkbox"
            name="sign"
            id="sign"
            onChange={() =>
              this.setState(() => {
                debugger;
                return {
                  mode: this.state.mode === 'signIn' ? 'signUp' : 'signIn',
                };
              })
            }
          />
          <label htmlFor="sign" className="toggle-button" />
          <label
            htmlFor="sign"
              className={classnames({
                active: this.state.mode === 'signUp',
              })
            }
          >
            Sign Up
          </label>
        </div>
        {this.state.mode === 'signIn' && (
          <SignInForm handleSignIn={this.props.handleSignIn} />
        )}
        {this.state.mode === 'signUp' && (
          <SignUpForm handleSignUp={this.props.handleSignUp} />
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
