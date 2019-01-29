import React from 'react';
import injectSheet from 'react-jss';
import styles from './LibrarySidebar.styles';
import LibraryTreeView from './LibraryTreeView';

export const LibrarySidebar = ({classes, directories, selectedFile, onZipFileSelected}) => (
  <div className={ classes.LibrarySidebar }>
    <LibraryTreeView directories={ directories } />
    <input
      type='file'
      id='zippedHtmlUpload'
      name='zippedHtmlUpload'
      accept='.zip'
      value={ selectedFile }
      onChange={ onZipFileSelected }
    />
    <label htmlFor="zippedHtmlUpload">Import HTML</label>
  </div>
);

export default injectSheet(styles)(LibrarySidebar);
