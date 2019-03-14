import React, { Component } from 'react';
import injectSheet from 'react-jss';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
    };
  }

  maySubmit = () => {
    const { emailAddress, password } = this.state;
    return emailAddress.length > 0 && password.length > 0;
  };

  render() {
    return (
      <React.Fragment>
        <form
          className={this.props.classes.SignInForm}
          onSubmit={event => {
            if (!this.maySubmit()) return;
            event.preventDefault();
            this.props.handleSignIn(this.state);
          }}
        >
          <div className={this.props.classes.FormInputs}>
            <TextInput
              placeholder={'Email'}
              type="email"
              onChange={event =>
                this.setState({ emailAddress: event.target.value })
              }
            />
            <TextInput
              placeholder={'Passwort'}
              type="password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
            { this.props.error &&
              <p className={this.props.classes.SignInError}>{this.props.error}</p>
            }
          </div>
          <Button
            type="submit"
            minWidth={'100%'}
            buttonStyle={'round'}
            disabled={this.maySubmit() === false}
          >
            Start
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const styles = {
  SignInForm: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '43px 0',
  },
  FormInputs: {
    height: '100%',
    marginBottom: '20px'
  },
  SignInError: {
    color: '#c0392b',
    textAlign: 'center'
  }
};

export default injectSheet(styles)(SignInForm);
