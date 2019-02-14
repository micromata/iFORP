import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './LibraryZipUpload.styles';

export class LibraryZipUpload extends Component {

  handleFileInputChange = event => {
    const fileToUpload = event.target.files[0];
    event.target.value = null;
    this.props.onZipFileSelected(fileToUpload);
  }

  render() {
    return (
      <div className={ this.props.classes.LibraryZipUpload }>
        <input
          type='file'
          id='zippedHtmlUpload'
          name='zippedHtmlUpload'
          accept='.zip'
          onChange={ this.handleFileInputChange }
        />
        <label htmlFor="zippedHtmlUpload">HTML hochladen</label>
      </div>
    )
  }

}

export default injectSheet(styles)(LibraryZipUpload);
