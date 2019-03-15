import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewAnnotation.styles.js';
import EditableText from '../EditableText/EditableText';
import DeleteIcon from '../../assets/img/Delete';
import EditNewViewAnnotation from './EditNewViewAnnotation';

const viewportSizeMap = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  phone: 'Smartphone'
};

class ViewAnnotation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    }
  }

  handleIsEditingChanged = isEditing => {
    this.setState({isEditing});
  }

  render () {
    return (
      <div className={ this.props.classes.ViewAnnotation}>
        <div className={ this.props.classes.AnnotationBubble }>
          { this.props.annotation.index }
        </div>
        { !this.props.annotation.isNewAnnotation &&
          <>
          <div className={ this.props.classes.AnnotationText}>
            <span>
              <b>{ this.props.annotation.author }</b>, am { this.props.annotation.formattedDate }, { viewportSizeMap[this.props.annotation.viewportSize] }
            </span>
            <EditableText
              inputStyle='TextInput'
              text={ this.props.annotation.text }
              maxLength={ 140 }
              onIsEditingChanged={ this.handleIsEditingChanged }
              onEditingConfirmed={ newText => this.props.onChangeAnnotationText(this.props.annotation.id, newText) }
              showSaveAndCancelButtons
            />
          </div>
          <div className={this.props.classes.DeleteButton} onClick={() => this.props.onDeleteAnnotation(this.props.annotation.id)}>
            <DeleteIcon />
          </div>
        </>
      }
      {
        this.props.annotation.isNewAnnotation &&
        <EditNewViewAnnotation
          onCreateAnnotation={ this.props.onCreateAnnotation }
          onCancelAnnotate={ this.props.onCancelAnnotate }
        />
      }
    </div>
  )
}
}

export default injectSheet(styles)(ViewAnnotation);
