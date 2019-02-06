import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewAnnotationListItem.styles.js';
import EditableText from '../EditableText/EditableText';
import DeleteIcon from '../../assets/img/Delete';

const ViewAnnotationListItem = ({
  classes,
  annotation,
  onChangeAnnotationText,
  onDeleteAnnotation
}) => (
  <li className={ classes.ViewAnnotationListItem}>
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
  </li>
);

export default injectSheet(styles)(ViewAnnotationListItem);
