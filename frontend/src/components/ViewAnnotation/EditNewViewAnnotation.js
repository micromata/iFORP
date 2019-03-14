import React from 'react';
import injectSheet from 'react-jss';
import styles from './EditNewViewAnnotation.styles.js';
import { getUserFromToken } from '../../services/auth.service';

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
        <input
          type="text"
          value={ this.state.author }
          onChange={ this.handleChangeAuthor }
        />
        <textarea
          value={ this.state.text }
          onChange={ this.handleChangeText }
        />
        <div>
          <button type="button" onClick={ this.props.onCancelAnnotate }>Abbrechen</button>
          <button type="button" onClick={ this.handleCreateAnnotation}>Speichern</button>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(EditNewViewAnnotation);
