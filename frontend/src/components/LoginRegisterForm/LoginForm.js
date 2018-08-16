import React, { Component } from 'react';
import injectSheet from 'react-jss';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
    };
  }

  render() {
    return (
      <div className={this.props.classes.LoginForm}>
        <form
          className={'form-inputs'}
          onSubmit={(event) => {
            event.preventDefault();
            debugger;
            return this.props.handleLogin(this.state);
          }}
        >
          <TextInput
            placeholder={'Email Address'}
            onChange={event =>
              this.setState({ emailAddress: event.target.value })
            }
          />
          <TextInput
            placeholder={'Password'}
            type="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
        </form>
        <Button
          minWidth={'100%'}
          buttonStyle={'round'}
          onClick={() => this.props.handleLogin(this.state)}
        >
          Start prototyping
        </Button>
      </div>
    );
  }
}

const styles = {
  LoginForm: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '43px 0',
  },
};

export default injectSheet(styles)(LoginForm);
