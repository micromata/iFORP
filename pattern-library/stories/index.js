import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header from '../components/Header';
import Text from '../components/Text';

import 'normalize.css/normalize.css';

storiesOf('Header', module)
  .add('with text', () => (
    <Header title="Bibliothek" />
  ));
