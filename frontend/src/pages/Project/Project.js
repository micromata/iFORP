import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './Project.styles';
import NavBar from '../../components/NavBar/NavBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import EditableText from '../../components/EditableText/EditableText';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import TileWhiteboardIcon from '../../assets/img/TileWhiteboard';
import CircleButton from '../../components/Button/CircleButton';
import PlusIcon from '../../assets/img/Plus';
import { createNewWhiteboard, renameWhiteboard, deleteWhiteboard } from '../../actions/app-actions';
import { findProjectWithId } from '../../utils';
import Modal from '../../components/Modal/Modal';
import PageHeadline from '../../components/PageHeadline/PageHeadline';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { deleteWhiteboardId: null }
  }

  handleCreateWhiteboadClick = () => {
    this.props.createNewWhiteboard(this.props.project.id);
  }

  handleDeleteWhiteboardClick = whiteboardId => {
    this.setState({ deleteWhiteboardId: whiteboardId });
  }

  navigateToWhiteboard = whiteboardId => {
    this.props.history.push(`/projects/${this.props.project.id}/whiteboards/${whiteboardId}`);
  }

  handleConfirmDeleteWhiteboard = async () => {
    await this.props.deleteWhiteboard(this.props.project.id, this.state.deleteWhiteboardId);
    this.setState({ deleteWhiteboardId: null });
  }

  handleCancelDeleteWhiteboard = () => {
    this.setState({ deleteWhiteboardId: null });
  }

  render() {
    if (!this.props.project) return null;

    return (
      <React.Fragment>
        <NavBar
          exit
          exitUrl={ `/projects` }
          title='iFORP'
        />
        <div className={this.props.classes.Project}>
          <PageHeadline title={this.props.project.name} />
          <ElementGrid>
            { this.props.project.whiteboards.map(whiteboard =>
              <ButtonTile
                key={ whiteboard.id }
                titleBelow
                TileIcon={ TileWhiteboardIcon }
                onClick={ () => this.navigateToWhiteboard(whiteboard.id) }
                onDeleteClick={() => this.handleDeleteWhiteboardClick(whiteboard.id)}>
                <EditableText
                  classNames='Secondary'
                  text={ whiteboard.name }
                  onEditingConfirmed={ newName => this.props.renameWhiteboard(this.props.project.id, whiteboard.id, newName) }
                />
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar entries={ this.props.navigationMenuEntries } pullUp>
          <div />
          <CircleButton onClick={ this.handleCreateWhiteboadClick }>
            <PlusIcon />
          </CircleButton>
        </ProjectButtonBar>
        <Modal
          show={ Boolean(this.state.deleteWhiteboardId) }
          headerText='Whiteboard löschen'
          bodyText={ 'Möchten Sie das Whiteboard wirklich löschen?' }
          labelCancel='Nein'
          labelConfirm='Ja'
          onCancel={ this.handleCancelDeleteWhiteboard }
          onConfirm={ this.handleConfirmDeleteWhiteboard }
        />
      </React.Fragment>
    );
  }
}

const actions = { createNewWhiteboard, renameWhiteboard, deleteWhiteboard };

const mapStateToProps = (state, ownProps) => {
  const projectId = parseInt(ownProps.match.params.id, 10);

  const projectNavEntries = state.app.projects.
    filter(item => item.id !== projectId).
    map(item => ({ title: item.name, url: `/projects/${item.id}` }));

  return {
    project: findProjectWithId(state.app.projects, projectId),
    navigationMenuEntries: [
      { title: 'Startseite', url: '/'},
      { title: 'Bibliothek', url: '/library'},
      { title: 'Projektübersicht', url: '/projects'},
      ...projectNavEntries
    ]
  }
};

const ProjectContainerWithStyles = injectSheet(styles)(Project);
export default connect(mapStateToProps, actions)(ProjectContainerWithStyles);
