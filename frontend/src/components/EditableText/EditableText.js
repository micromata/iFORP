/* eslint-disable filenames/match-exported */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './EditableText.styles';
import TextInput from '../TextInput/TextInput';

export class EditableText extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = { isEditing: false, editedText: null };
  }

  handleSetEditMode = () => {
    this.setState(
      { isEditing: true, editedText: this.props.text },
      () => {
        if (this.props.inputStyle === 'TextInput') return;
        this.inputRef.current.focus();
        this.inputRef.current.select();
      }
    );
  }

  handleInputChange = event => {
    this.setState({ editedText: event.target.value });
  }

  cancelEditing = event => {
    event && event.stopPropagation(); // eslint-disable-line
    this.setState({ isEditing: false, editedText: null });
  }

  confirmEditing = async event => {
    event && event.stopPropagation(); // eslint-disable-line
    await this.props.onEditingConfirmed(this.state.editedText);
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
      <div className={ `${this.props.classes.EditableText} ${this.props.classNames || ''}` } onClick={ this.handleSetEditMode }>
        { !this.state.isEditing &&
          <React.Fragment>
            { this.props.text }
          </React.Fragment>
        }
        { this.state.isEditing && !this.props.inputStyle &&
          <input
            type='text'
            ref={ this.inputRef }
            value={ this.state.editedText }
            onChange={ this.handleInputChange }
            onBlur={ this.confirmEditing }
            onKeyDown={ this.handleInputKeyDown }
            minLength={ this.props.minLength || 5 }
            maxLength={ this.props.maxLength || 20 }
          />
        }
        { this.state.isEditing && this.props.inputStyle === 'TextInput' &&
          <>
            <TextInput
              value={ this.state.editedText }
              onChange={ this.handleInputChange }
              onBlur={ this.confirmEditing }
              onKeyDown={ this.handleInputKeyDown }
              minLength={ this.props.minLength || 5 }
              maxLength={ this.props.maxLength || 20 }
            />
            { this.props.showSaveAndCancelButtons &&
              <div className={ this.props.classes.Buttons }>
                <button type="button" onClick={ this.cancelEditing }>Abbrechen</button>
                <button type="button" onClick={ this.confirmEditing }>Speichern</button>
              </div>
            }
          </>
        }
      </div>
    )
  }
}

export default injectSheet(styles)(EditableText);
