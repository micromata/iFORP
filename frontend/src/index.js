import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './configure-store';
import { Provider } from 'react-redux';
import { create as createJss } from 'jss';
import { JssProvider } from 'react-jss';
import camelCase from 'jss-camel-case';
import nested from 'jss-nested';
import globals from 'jss-global';
import { verifyToken } from './services/auth.service';
import { getAllProjects } from './actions/app-actions';
// Import './index.css';

import App from './app';
import registerServiceWorker from './registerServiceWorker';
import ThemeSwitch from './ThemeSwitch';

(async() => {
  const store = configureStore();

  const jss = createJss();
  jss.use(nested(), camelCase(), globals());

  if (verifyToken()) {
    await getAllProjects()(store.dispatch);
  }

  ReactDOM.render(
    <JssProvider jss={jss}>
      <Provider store={ store }>
        <ThemeSwitch>
          <App />
        </ThemeSwitch>
      </Provider>
    </JssProvider>,
    document.querySelector('#root')
  );

  registerServiceWorker();
})();
