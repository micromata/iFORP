import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewAnnotationPanel.styles';
import ViewAnnotation from './ViewAnnotation';
import ViewportSwitch from '../ViewportSwitch/ViewportSwitch';
import Toggle from '../Toggle/Toggle';

export const ViewAnnotationPanel = ({
    classes,
    annotations,
    currentViewportSize,
    isAnnotationModeActive,
    annotationToShow,
    onChangeViewportSize,
    onChangeAnnotationText,
    onDeleteAnnotation,
    onToggleAnnotationMode,
    onCancelAnnotate,
    onCreateAnnotation,
    className = ''
  }) => (
  <div className={ `${classes.ViewAnnotationPanel} ${className} ${ annotationToShow ? 'visible' : '' }` }>
    <div className={ classes.Buttons }>
      <Toggle
        labelRight={`Anmerkungen (${annotations.length})`}
        isActive={isAnnotationModeActive}
        onToggle={onToggleAnnotationMode}
      />
      <ViewportSwitch
        currentViewportSize={ currentViewportSize }
        onChangeViewportSize={ onChangeViewportSize }
      />
    </div>
    { Boolean(isAnnotationModeActive && Boolean(annotationToShow)) &&
      <ViewAnnotation
        currentViewportSize={ currentViewportSize }
        annotation={ annotationToShow }
        onChangeAnnotationText={ onChangeAnnotationText }
        onDeleteAnnotation={ onDeleteAnnotation }
        onCreateAnnotation={ onCreateAnnotation }
        onCancelAnnotate={ onCancelAnnotate }
      />
    }
  </div>
);

export default injectSheet(styles)(ViewAnnotationPanel);
