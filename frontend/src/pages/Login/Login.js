import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';
import MicromataBrand from '../../assets/img/MicromataBrand';
import BBFLogo from '../../assets/img/BBF.png';
import IForpBrand from '../../assets/img/IForpBrand';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as backend from '../../services/backendrequest.service';
import styles from './Login.styles';
import { setToken, verifyToken } from '../../services/auth.service';
import { getAllProjects } from '../../actions/app-actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { signInError: null, signUpError: null };
  }

  resetErrors = () => {
    this.setState({signInError: null, signUpError: null});
  }

  handleSignIn = async credentials => {
    try {
      const response = await backend.post('/auth/login', credentials);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const json = await response.json();
      setToken(json.token);
      this.props.history.push('/');
      this.props.getAllProjects();
    } catch (error) {
      this.setState({ signInError: error.message });
    }
  }

  handleSignUp = async userData => {
    try {
      const response = await backend.post('/auth/register', userData);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const json = await response.json();
      setToken(json.token);
      this.props.history.push('/');
      this.props.getAllProjects();
    } catch (error) {
      this.setState({ signUpError: error.message });
    }
  }

  render() {
    const isTokenValid = verifyToken();
    if (isTokenValid) return (<Redirect to="/" />);

    return (
      <div className={ this.props.classes.Login }>
        <main className={ this.props.classes.LoginMain}>
          <div className={this.props.classes.Hero}>
            <IForpBrand className={this.props.classes.IforpBrand} />
            <p className={this.props.classes.HeroText}>
              Erstelle Deinen eigenen HTML-Prototypen<br />
              ohne Programmiererfahrung.
            </p>
          </div>
          <LoginForm
            handleSignIn={this.handleSignIn}
            handleSignUp={this.handleSignUp}
            signInError={this.state.signInError}
            signUpError={this.state.signUpError}
          />
        </main>
        <footer className={this.props.classes.Footer}>
          <div className={this.props.classes.Promoters}>
            <div>
              Dieses Projekt wird gefördert durch<br /><br />
              <img
                src={BBFLogo}
                className={this.props.classes.PromoterLogo}
                alt="Bundesagentur für Bildung und Forschung"
              />
            </div>
            <MicromataBrand className={this.props.classes.PromoterLogo} />
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = null;
const actions = { getAllProjects };

const LoginWithStyles = injectSheet(styles)(Login);
export default connect(mapStateToProps, actions)(LoginWithStyles);
