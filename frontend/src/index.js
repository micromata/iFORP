import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './configure-store';
import { Provider } from 'react-redux';
import { create as createJss } from 'jss';
import { JssProvider } from 'react-jss';
import camelCase from 'jss-camel-case';
import nested from 'jss-nested';
import globals from 'jss-global';
// import './index.css';

import App from './app';
import registerServiceWorker from './registerServiceWorker';
import ThemeSwitch from './ThemeSwitch';

const store = configureStore();

const jss = createJss();
jss.use(nested(), camelCase(), globals());

ReactDOM.render(
  <JssProvider jss={jss}>
    <Provider store={ store }>
      <ThemeSwitch>
        <App />
      </ThemeSwitch>
    </Provider>
  </JssProvider>,
  document.getElementById('root')
);

registerServiceWorker();
