import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewAnnotation.styles.js';
import EditableText from '../EditableText/EditableText';
import DeleteIcon from '../../assets/img/Delete';

const ViewAnnotation = ({
  classes,
  annotation,
  onChangeAnnotationText,
  onDeleteAnnotation
}) => (
  <div className={ classes.ViewAnnotation}>
    <div className={ classes.AnnotationBubble }>
      { annotation.id }
    </div>
    <div className={ classes.AnnotationText}>
      <EditableText
        text={ annotation.text }
        onEditingConfirmed={ newText => onChangeAnnotationText(annotation.id, newText) }
        maxLength={ 140 }
      />
    </div>
    <div className={classes.DeleteButton} onClick={() => onDeleteAnnotation(annotation.id)}>
      <DeleteIcon />
    </div>
  </div>
);

export default injectSheet(styles)(ViewAnnotation);
