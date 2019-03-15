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

  render() {
    return (
      <div className={ this.props.classes.EditNewViewAnnotation }>
        <TextInput value={ this.state.author } onChange={ this.handleChangeAuthor } placeholder='Autor' />
        <TextInput value={ this.state.text } onChange={ this.handleChangeText } placeholder='Anmerkung' />
        <div className={ this.props.classes.Buttons }>
          <button type="button" onClick={ this.props.onCancelAnnotate }>Abbrechen</button>
          <button type="button" onClick={ this.handleCreateAnnotation}>Speichern</button>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(EditNewViewAnnotation);
