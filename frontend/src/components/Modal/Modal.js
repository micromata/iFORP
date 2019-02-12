import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './Modal.styles';
import Button from '../Button/Button';

class Modal extends Component {

  componentDidUpdate () {
    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.props.show) {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    console.log('keydown');
    if (event.code === 'Escape') return this.props.onCancel();
    if (event.code === 'Enter') return this.props.onConfirm();
  }

  render () {
    if (!this.props.show) return null;

    return (
      <div className={ this.props.classes.ModalBackground }>
        <div className={ this.props.classes.Modal }>
          <div className={ this.props.classes.ModalHeader }>
            { this.props.headerText }
          </div>
          <div className={ this.props.classes.ModalBody }>
            <p>
              { this.props.bodyText }
            </p>
          </div>
          <div className={ this.props.classes.ModalFooter }>
            <Button buttonStyle='rounded-corners' className='light' onClick={ this.props.onCancel }>
              { this.props.labelCancel || 'Abbrechen' }
            </Button>
            <Button buttonStyle='rounded-corners' onClick={ this.props.onConfirm }>
              { this.props.labelConfirm || 'OK' }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Modal);
