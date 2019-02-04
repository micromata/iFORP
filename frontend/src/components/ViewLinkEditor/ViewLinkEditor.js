import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './ViewLinkEditor.styles';
import SelectWithLabel from '../SelectWithLabel/SelectWithLabel';

class ViewLinkEditor extends Component {
  render() {
    if (!this.props.availableInteractionElements || !this.props.viewLinkOptions) return null;

    return (
      <div className={ this.props.classes.ViewLinkEditor }>
        <h3>Verlinkungen</h3>
        {
          this.props.availableInteractionElements.map((element, index) => (
            <SelectWithLabel
              key={ index }
              label={ element.title }
              options={ this.props.viewLinkOptions }
              value={ this.props.links[element.id] || 0 }
              onChange={ event => this.props.setLinkTarget(element.id, event.target.value) }
            />
          ))
        }
      </div>
    )
  }
}

export default injectSheet(styles)(ViewLinkEditor);
