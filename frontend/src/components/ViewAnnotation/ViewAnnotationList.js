import React from 'react';
import injectSheet from 'react-jss';
import styles from './ViewAnnotationList.styles.js';
import ViewAnnotationListItem from './ViewAnnotationListItem';

const ViewAnnotationList = ({
  classes,
  annotations,
  onChangeAnnotationText
}) => (
  <ul className={ classes.ViewAnnotationList }>
    { annotations.map(annotation =>
      <ViewAnnotationListItem
        key={ annotation.id }
        annotation={ annotation }
        onChangeAnnotationText={ onChangeAnnotationText }
      />
    ) }
  </ul>
);

export default injectSheet(styles)(ViewAnnotationList);
