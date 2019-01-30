/* eslint-disable filenames/match-exported */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './EditableName.styles';

export class EditableName extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = { isEditing: false, editedName: null };
  }

  handleSetEditMode = () => {
    this.setState(
      { isEditing: true, editedName: this.props.name },
      () => {
        this.inputRef.current.focus();
        this.inputRef.current.select();
      }
    );
  }

  handleInputChange = event => {
    this.setState({ editedName: event.target.value });
  }

  cancelEditing = () => {
    this.setState({ isEditing: false, editedName: null });
  }

  confirmEditing = async () => {
    await this.props.onEditingConfirmed(this.state.editedName);
    this.cancelEditing();
  }

  handleInputKeyDown = event => {
    if (event.key === 'Escape') {
      return this.cancelEditing();
    }

    if (event.key === 'Enter') {
      return this.confirmEditing();
    }
  }

  render() {
    return (
      <div className={ this.props.classes.EditableName } onClick={ this.handleSetEditMode }>
        { !this.state.isEditing &&
          <React.Fragment>
            { this.props.name }
          </React.Fragment>
        }
        { this.state.isEditing &&
          <input
            type='text'
            ref={ this.inputRef }
            value={ this.state.editedName }
            onChange={ this.handleInputChange }
            onBlur={ this.cancelEditing }
            onKeyDown={ this.handleInputKeyDown }
            minLength={ 5 }
            maxLength={ 20 }
          />
        }
      </div>
    )
  }
}

export default injectSheet(styles)(EditableName);
