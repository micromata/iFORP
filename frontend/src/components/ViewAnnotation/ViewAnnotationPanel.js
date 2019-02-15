import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewAnnotationPanel.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';
import CircleButton from '../Button/CircleButton';
import ViewAnnotationList from './ViewAnnotationList';
import ViewportSwitch from '../ViewportSwitch/ViewportSwitch';

export const ViewAnnotationPanel = ({ classes, annotations, currentViewportSize, onChangeViewportSize, onChangeAnnotationText, onDeleteAnnotation, onToggleVisibility, visible, className = '' }) => (
  <div className={ `${classes.ViewAnnotationPanel} ${className} ${ visible ? 'visible' : '' }` }>
    <div className={ classes.Buttons }>
      <div />
      <CircleButton onClick={ onToggleVisibility}>
        <ArrowDownIcon />
      </CircleButton>
      <ViewportSwitch
        currentViewportSize={ currentViewportSize }
        onChangeViewportSize={ onChangeViewportSize }
      />
    </div>
    { Boolean(visible && annotations.length) &&
      <ViewAnnotationList
        annotations={ annotations }
        onChangeAnnotationText={ onChangeAnnotationText }
        onDeleteAnnotation={ onDeleteAnnotation }
      />
    }
    { Boolean(visible && !annotations.length) &&
      <i><br /><br />Durch Klicken auf den Screen können Sie Anmerkungen erstellen.</i>
    }
  </div>
);

export default injectSheet(styles)(ViewAnnotationPanel);
