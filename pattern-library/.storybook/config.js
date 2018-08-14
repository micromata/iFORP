import 'normalize.css/normalize.css';
import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import ThemeDecorator from '../ThemeDecorator';

const req = require.context('../components', true, /stories\.js$/);
function loadStories() {
  req.keys().forEach(req);
}

addDecorator(storyFn => {
  const darkMode = boolean('Dark mode', false);
  return <ThemeDecorator storyFn={storyFn} darkMode={darkMode} />;
});

addDecorator(withKnobs);
configure(loadStories, module);
