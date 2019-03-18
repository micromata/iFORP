import React from 'react';
import injectSheet from 'react-jss';
import styles from './EditNewViewAnnotation.styles.js';
import { getUserFromToken } from '../../services/auth.service';
import TextInput from '../TextInput/TextInput';

class EditNewViewAnnotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: getUserFromToken().username,
      text: ''
    }
  }

  handleChangeAuthor = event => {
    this.setState({
      author: event.target.value
    })
  }

  handleChangeText = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleCreateAnnotation = () => {
    this.props.onCreateAnnotation({ author: this.state.author, text: this.state.text });
  }

  handleTextKeyDown = event => {
    if (event.key === 'Enter') {
      return this.handleCreateAnnotation();
    }
  }

  render() {
    return (
      <div className={ this.props.classes.EditNewViewAnnotation }>
        <TextInput
          value={ this.state.author }
          placeholder='Autor'
          maxLength={50}
          onChange={ this.handleChangeAuthor }
        />
        <TextInput
          value={ this.state.text }
          placeholder='Anmerkung'
          maxLength={140}
          onChange={ this.handleChangeText }
          onKeyDown={ this.handleTextKeyDown }
        />
        <div className={ this.props.classes.Buttons }>
          <button type="button" onClick={ this.props.onCancelAnnotate }>Abbrechen</button>
          <button type="button" onClick={ this.handleCreateAnnotation}>Speichern</button>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(EditNewViewAnnotation);
