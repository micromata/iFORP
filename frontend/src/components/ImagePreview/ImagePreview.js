import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './ImagePreview.styles';
import { baseURL } from '../../utils';

export class ImagePreview extends Component {
  render() {
    if (!this.props.image || !this.props.image.name) return null;

    const style = {
      width: this.props.image.width,
      height: this.props.image.height,
      backgroundImage: `url(${baseURL}/library/images/${this.props.image.name})`
    };

    return (
      <div className={ `${this.props.classes.ImagePreview} preview-wrapper ${this.props.viewportSize}` }>
        <div className='preview' style={ style } />
      </div>
    );
  }
}

export default injectSheet(styles)(ImagePreview);
