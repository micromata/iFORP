import React, { Component } from 'react';
import injectSheet from 'react-jss';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailAddress: '',
      password: '',
      passwordRepeat: '',
    };
  }

  render() {
    return (
      <div className={this.props.classes.Register}>
        <form
          className={'form-inputs'}
          onSubmit={event => {
            event.preventDefault();
            this.props.handleLogin(this.state);
          }}
        >
          <TextInput
            placeholder={'Name'}
            onChange={event => this.setState({ name: event.target.value })}
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
            onChange={event => this.setState({ password: event.target.value })}
          />
          <TextInput
            placeholder={'Password repeat'}
            type="password"
            onChange={event => this.setState({ passwordRepeat: event.target.value })}
          />
        </form>
        <Button
          minWidth={'100%'}
          buttonStyle={'round'}
          onClick={() => this.props.handleRegister(this.state)}
        >
          Start prototyping
        </Button>
      </div>
    );
  }
}

const styles = {
  Register: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '43px 0',
  },
};

export default injectSheet(styles)(RegisterForm);
