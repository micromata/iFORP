import React from 'react';
import injectSheet from 'react-jss';
import { styles } from './Login.styles';
import MicromataLogo from '../../assets/img/micromata.svg';
import BBFLogo from '../../assets/img/BBF.png';

const Login = ({ classes }) => (
  <div className={classes.Login}>
    <main>
      <div className="grid">
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
