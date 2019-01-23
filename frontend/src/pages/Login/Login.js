import React, { Component } from 'react';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';
import MicromataBrand from '../../assets/img/MicromataBrand';
import BBFLogo from '../../assets/img/BBF.png';
import IForpBrand from '../../assets/img/IForpBrand';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as backend from '../../services/backendrequest.service';
import styles from './Login.styles';
import { setToken, getToken, verifyToken } from '../../services/auth.service';

class Login extends Component {

  handleSignIn = async credentials => {
    try {
      const response = await backend.post('/auth/login', credentials);
      const json = await response.json();
      setToken(json.token);
      this.props.history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  handleSignUp = async userData => {
    try {
      const response = await backend.post('/auth/register', userData);
      const json = await response.json();
      setToken(json.token);
      this.props.history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const isTokenValid = verifyToken();
    if (isTokenValid) return (<Redirect to="/" />);

    return (
      <div>
        <main>
          <div className={this.props.classes.Hero}>
            <IForpBrand className={this.props.classes.IforpBrand} />
            <p className={this.props.classes.HeroText}>
              Build your own HTML prototype without any coding experience.
            </p>
          </div>
          <LoginForm
            handleSignIn={this.handleSignIn}
            handleSignUp={this.handleSignUp}
          />
        </main>
        <footer className={this.props.classes.Footer}>
          Dieses Projekt wird gefördert durch
          <div className={this.props.classes.Promoters}>
            <img
              src={BBFLogo}
              className={this.props.classes.PromoterLogo}
              alt="Bundesagentur für Bildung und Forschung"
            />
            <MicromataBrand className={this.props.classes.PromoterLogo} />
          </div>
        </footer>
      </div>
    );
  }
}

export default injectSheet(styles)(Login);
