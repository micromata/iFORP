import React from 'react';
import injectSheet from 'react-jss';
import { styles } from './Login.styles';
import MicromataLogo from '../../assets/img/micromata.svg';
import BBFLogo from '../../assets/img/BBF.png';
import Logo from '../../assets/img/iForp.png';

const Login = ({ classes }) => (
  <div className={classes.Login}>
    <main>
      <div className="grid">
        <div className="introducing-section">
          <div className="introducing-container">
            <div className="logo">
              <img src={Logo} alt="iForp" />
              <p>Build your own HTML-Prototyp without any coding experience.</p>
            </div>
          </div>
        </div>
        <div className="login-container">
          <form action="" className="login-form">
            <div className="toggle">
              <label htmlFor="sign">Sign In</label>
              <input type="checkbox" className="toggle-checkbox" name="sign" id="sign" />
              <label htmlFor="sign" className="toggle-button" />
              <label htmlFor="sign">Sign Up</label>
            </div>
          </form>
        </div>
      </div>
    </main>
    <footer>
      <p>Dises Projekt wird gefördert durch:</p>
      <div className="promoters">
        <div>
          <img src={BBFLogo} alt="Bundesagentur für Bildung und Forschung" />
        </div>
        <div>
          <img src={MicromataLogo} alt="Micromata" />
        </div>
      </div>
    </footer>
  </div>
);

export default injectSheet(styles)(Login);
