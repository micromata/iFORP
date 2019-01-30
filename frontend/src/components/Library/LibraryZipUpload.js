import React from 'react';
import injectSheet from 'react-jss';
import styles from './LibraryZipUpload.styles';

export const LibraryZipUpload = ({classes, onZipFileSelected}) => (
  <div className={ classes.LibraryZipUpload }>
    <input
      type='file'
      id='zippedHtmlUpload'
      name='zippedHtmlUpload'
      accept='.zip'
      onChange={ onZipFileSelected }
    />
    <label htmlFor="zippedHtmlUpload">Import HTML</label>
  </div>
);

export default injectSheet(styles)(LibraryZipUpload);
