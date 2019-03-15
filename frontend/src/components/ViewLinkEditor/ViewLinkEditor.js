import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './ViewLinkEditor.styles';
import LinkSelectForHTML from './LinkSelectForHTML';
import LinkSelectForImage from './LinkSelectForImage';
import config from '../../config';

class ViewLinkEditor extends Component {
  render() {
    if (!this.props.availableInteractionElements || !this.props.viewLinkOptions) return null;

    return (
      <div className={ this.props.classes.ViewLinkEditor }>
        <h3>{ config.whiteboardClickflow === 'linear' ? 'Verlinkung setzen' : 'Verlinkungen setzen' }</h3>
        { this.props.fileType === 'image' && !this.props.availableInteractionElements.length &&
          <p className={ this.props.classes.ImageLinkTeaser }>
            Du hast bisher noch keine Verlinkung gesetzt.
            Bitte markiere dazu einen Bereich, der dazu dienen soll und legen anschließend das Link-Ziel fest.
          </p>
        }

        { this.props.fileType === 'html' &&
          this.props.availableInteractionElements.map(element => (
            <LinkSelectForHTML
              key={ element.id }
              label={ element.title }
              options={ this.props.viewLinkOptions }
              value={ this.props.links[element.id] || 0 }
              onChange={ event => this.props.setLinkTarget(element.id, event.target.value) }
            />
          ))
        }
        { this.props.fileType === 'image' &&
          this.props.availableInteractionElements.map((element, index) => (
            <LinkSelectForImage
              key={ index }
              number={ index + 1 }
              interactionId={ element.id }
              options={ this.props.viewLinkOptions }
              value={ this.props.links[element.id] || 0 }
              onChange={ event => this.props.setLinkTarget(element.id, event.target.value) }
              onDelete={ this.props.deleteImageInteractionElement }
            />
          ))
        }
      </div>
    )
  }
}

export default injectSheet(styles)(ViewLinkEditor);
