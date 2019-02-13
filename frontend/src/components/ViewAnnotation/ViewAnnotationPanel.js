import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewAnnotationPanel.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';
import CircleButton from '../Button/CircleButton';
import ViewAnnotationList from './ViewAnnotationList';

export const ViewAnnotationPanel = ({ classes, annotations, onChangeAnnotationText, onDeleteAnnotation, onToggleVisibility, visible, className = '' }) => (
  <div className={ `${classes.ViewAnnotationPanel} ${className} ${ visible ? 'visible' : '' }` }>
    <CircleButton onClick={ onToggleVisibility}>
      <ArrowDownIcon />
    </CircleButton>
    { Boolean(visible && annotations.length) &&
      <ViewAnnotationList
        annotations={ annotations }
        onChangeAnnotationText={ onChangeAnnotationText }
        onDeleteAnnotation={ onDeleteAnnotation }
      />
    }
    { Boolean(visible && !annotations.length) &&
      <i><br />Es sind keine Anmerkungen vorhanden.<br /><br />Durch Klicken auf die Vorschau können Sie eine Anmerkung erstellen.</i>
    }
  </div>
);

export default injectSheet(styles)(ViewAnnotationPanel);
