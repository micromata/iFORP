import React, { Component } from 'react';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';
import MicromataLogo from '../../assets/img/micromata.svg';
import BBFLogo from '../../assets/img/BBF.png';
import iforpBrand from '../../assets/img/iforp-brand.svg';
import LoginRegisterForm from '../../components/LoginRegisterForm/LoginRegisterForm';
import * as backend from '../../backend';
import styles from './login.styles';

class Login extends Component {
  handleLogin = credentials =>
    backend
      .post('/auth/login', credentials)
      .then(res => res.json())
      .then(body => body.token)
      .then(token => {
        localStorage.setItem('id_token', token);
        this.props.history.push('/');
      })
      .catch(err => console.error(err));

  handleRegister = userData =>
    backend
      .post('/auth/register', userData)
      .then(res => res.json())
      .then(body => body.token)
      .then(token => {
        localStorage.setItem('id_token', token);
        this.props.history.push('/');
      })
      .catch(err => console.error(err));

  render() {
    const token = localStorage.getItem('id_token');
    return token ? (
      <Redirect to="/" />
    ) : (
      <div>
        <main>
          <div className={this.props.classes.Hero}>
            <img
              src={iforpBrand}
              className={this.props.classes.IforpBrand}
              alt="iFORP Logo"
            />
            <p className={this.props.classes.HeroText}>
              Build your own HTML prototype without any coding experience.
            </p>
          </div>
          <LoginRegisterForm
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
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
            <img
              src={MicromataLogo}
              className={this.props.classes.PromoterLogo}
              alt="Micromata"
            />
          </div>
        </footer>
      </div>
    );
  }
}

export default injectSheet(styles)(Login);
