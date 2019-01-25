import React, { Component } from 'react';
import injectSheet from 'react-jss';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      emailAddress: '',
      password: '',
      passwordRepeat: '',
    };
  }

  maySubmit = () => {
    const { username, emailAddress, password, passwordRepeat } = this.state;
    return username.length > 0 && emailAddress.length > 0 && password.length > 0 && password === passwordRepeat;
  };

  render() {
    return (
      <React.Fragment>
        <form
          className={this.props.classes.SignUpForm}
          onSubmit={event => {
            if (!this.maySubmit()) return;
            event.preventDefault();
            this.props.handleSignUp(this.state);
          }}
        >
          <div className={this.props.classes.FormInputs}>
            <TextInput
              placeholder={'Name'}
              onChange={event => this.setState({ username: event.target.value })}
            />
            <TextInput
              placeholder={'Email Address'}
              type="email"
              onChange={event =>
                this.setState({ emailAddress: event.target.value })
              }
            />
            <TextInput
              placeholder={'Password'}
              type="password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
            <TextInput
              placeholder={'Password repeat'}
              type="password"
              onChange={event =>
                this.setState({ passwordRepeat: event.target.value })
              }
            />
            { this.props.error &&
              <p className={this.props.classes.SignUpError}>{this.props.error}</p>
            }
          </div>
          <Button
            type="submit"
            minWidth={'100%'}
            buttonStyle={'round'}
            disabled={this.maySubmit() === false}
          >
            Start prototyping
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const styles = {
  SignUpForm: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '43px 0',
  },
  FormInputs: {
    height: '100%',
  },
  SignUpError: {
    color: '#c0392b'
  }
};

export default injectSheet(styles)(SignUpForm);
