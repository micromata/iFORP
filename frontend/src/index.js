import React from 'react';
import ReactDOM from 'react-dom';
import { create as createJss } from 'jss';
import { JssProvider } from 'react-jss';
import camelCase from 'jss-camel-case'
import nested from 'jss-nested';
import './index.css'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ThemeSwitch from './ThemeSwitch';

const jss = createJss();
jss.use(nested(), camelCase());

ReactDOM.render(
  <JssProvider jss={jss}>
    <ThemeSwitch>
      <App />
    </ThemeSwitch>
  </JssProvider>,
  document.getElementById('root')
);
registerServiceWorker();
