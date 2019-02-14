import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './LibraryImagesUpload.styles';

export class LibraryImagesUpload extends Component {

  handleFileInputChange = event => {
    const filesToUpload = [...event.target.files];
    this.props.onImagesSelected(filesToUpload);
    event.target.value = null;
  }

  render() {
    return (
      <div className={ this.props.classes.LibraryImagesUpload }>
        <input
          type='file'
          id='imagesUpload'
          name='imagesUpload'
          accept='.jpg, .jpeg, .png'
          multiple={ true }
          onChange={ this.handleFileInputChange }
        />
        <label htmlFor="imagesUpload">Bilder hochladen</label>
      </div>
    )
  }

}

export default injectSheet(styles)(LibraryImagesUpload);
