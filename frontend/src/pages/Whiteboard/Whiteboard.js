import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Whiteboard.styles';
import NavBar from '../../components/NavBar/NavBar';
import ButtonBar from '../../components/ButtonBar/ButtonBar';
import CircleButton from '../../components/Button/CircleButton';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import { getViewsForWhiteboard, createNewView } from '../../actions/app-actions';
import { findWhiteboardWithId } from '../../utils';
import PlusIcon from '../../assets/img/Plus';

class Whiteboard extends Component {
  componentDidMount = () => {
    this.props.getViewsForWhiteboard(this.props.projectId, this.props.whiteboardId);
  }


  handleAddViewClick = () => {
    this.props.createNewView(this.props.projectId, this.props.whiteboardId);
  }

  render() {
    if (!this.props.views) return null;

    return (
      <React.Fragment>
        <NavBar title={ `iFORP` } />
        <ElementGrid>
          { this.props.views.map(view =>
            <ButtonTile
              key={ view.id }
              titleBelow>
              { view.name }
            </ButtonTile>
          )}
        </ElementGrid>
        <ButtonBar>
          <div/>
          <CircleButton onClick={ this.handleAddViewClick }>
            <PlusIcon />
          </CircleButton>
          <div/>
        </ButtonBar>
      </React.Fragment>
    );
  }
}

const actions = { getViewsForWhiteboard, createNewView };

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.projectId, 10);
  const whiteboardId = parseInt(ownProps.match.params.whiteboardId, 10);
  const whiteboard = findWhiteboardWithId(state.app.projects, projectId, whiteboardId);
  const views = whiteboard && whiteboard.views;

  return {
    projectId,
    whiteboardId,
    views
  }
};

const WhiteboardContainerWithStyles = injectSheet(styles)(Whiteboard);
export default connect(mapStateToProps, actions)(WhiteboardContainerWithStyles);
