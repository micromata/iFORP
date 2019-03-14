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

const ViewAnnotation = ({ classes, annotation, onChangeAnnotationText, onDeleteAnnotation, onCreateAnnotation, onCancelAnnotate }) => (
  <div className={ classes.ViewAnnotation}>
    <div className={ classes.AnnotationBubble }>
      { annotation.isNewAnnotation ? '*' : annotation.index }
    </div>
    { !annotation.isNewAnnotation &&
      <>
      <div className={ classes.AnnotationText}>
        <span>
          <b>{ annotation.author }</b>, am { annotation.formattedDate }, { viewportSizeMap[annotation.viewportSize] }
        </span>
        <EditableText
          text={ annotation.text }
          onEditingConfirmed={ newText => onChangeAnnotationText(annotation.id, newText) }
          maxLength={ 140 }
        />
      </div>
      <div className={classes.DeleteButton} onClick={() => onDeleteAnnotation(annotation.id)}>
        <DeleteIcon />
      </div>
    </>
  }
  {
    annotation.isNewAnnotation &&
    <EditNewViewAnnotation
      onCreateAnnotation={ onCreateAnnotation }
      onCancelAnnotate={ onCancelAnnotate }
    />
  }
</div>
);

export default injectSheet(styles)(ViewAnnotation);
