import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageTile from './ImageTile/index';
import Header from './Header/index';
import Text from './Text/index';
import TextInput from './TextInput/index';
import Button from './Button/index';
import IconButton from './IconButton/index';
import Card from './Card/index';
import screenShotBase64 from '../base64Screenshot';

import 'normalize.css/normalize.css';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/atoms/TextInput/index';

storiesOf('Atoms/Text', module).add('Simple Text', () => (
  <Text>Hello World!</Text>
));

storiesOf('Atoms/Button', module)
  .add('Simple Button', () => <Button minWidth="120px" />)
  .add('Button with Text', () => (
    <Button minWidth="120px">
      <Text>Hello World!</Text>
    </Button>
  ))
  .add('Button with rounded corners', () => (
    <Button minWidth="120px" buttonStyle={'rounded-corners'}>
      <Text>Hello World!</Text>
    </Button>
  ))
  .add('Icon Button', () => <IconButton icon={faPlus} />);

storiesOf('Atoms/TextInput', module).add('TextInput element', () => (
  <Input type="text" placeholder={'Placeholder'} />
));

storiesOf('Atoms/Text TextInput', module).add('Simple Text TextInput', () => (
  <TextInput placeholder={'Placeholder'} />
));

storiesOf('Atoms/Card', module).add('Card with Text', () => (
  <Card>Hello World!</Card>
));

storiesOf('Atoms/Image Tile', module)
  .add('Simple tile w/o image', () => (
    <React.Fragment>
      {[...new Array(8)].map((_, idx) => (
        <ImageTile title={`Hello World ${idx + 1}`} selected={idx === 0} />
      ))}
    </React.Fragment>
  ))
  .add('Simple tile w/ image', () => (
    <React.Fragment>
      {[...new Array(8)].map((_, idx) => (
        <ImageTile
          title={`Hello World ${idx + 1}`}
          imageSrc={screenShotBase64}
          alt={'Screen Shot'}
          selected={idx === 0}
        />
      ))}
    </React.Fragment>
  ));

storiesOf('Molecules/Header', module).add('with text', () => (
  <Header title="Hello World!" />
));
