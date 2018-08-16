import React from 'react';
import injectSheet from 'react-jss';
import { styles } from './styles';
import MM from '../../assets/img/micromata.svg';
import BBF from '../../assets/img/BBF.png';

const Login = ({ classes }) => (
  <div className={classes.Login}>
    <footer>
      <p>Dises Projekt wird gefördert durch:</p>
      <div className="promoters">
        <div>
          <img src={BBF} alt="Bundesagentur für Bildung und Forschung" />
        </div>
        <div>
          <img src={MM} alt="Micromata" />
        </div>
      </div>
    </footer>
  </div>
);

export default injectSheet(styles)(Login);
