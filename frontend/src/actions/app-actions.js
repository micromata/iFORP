import * as http from '../services/backendrequest.service';
import { findWhiteboardWithId } from '../utils';

const actionNames = {
  PROJECTS_RECEIVED: 'PROJECTS_RECEIVED',
  PROJECT_CREATED: 'PROJECT_CREATED',
  WHITEBOARD_CREATED: 'WHITEBOARD_CREATED',
  VIEW_CREATED: 'VIEW_CREATED',
  VIEWS_LIST_RECEIVED: 'VIEWS_LIST_RECEIVED',
  VIEW_DELETED: 'VIEW_DELETED'
};

const getAllProjects = () => async dispatch => {
  const response = await http.get('/projects');
  const projects = await response.json();

  dispatch({
    type: actionNames.PROJECTS_RECEIVED,
    projects
  });
};

const createNewProject = navigateToProject => async dispatch => {
  const response = await http.post('/projects');
  const project = await response.json();

  dispatch({
    type: actionNames.PROJECT_CREATED,
    project
  });

  navigateToProject(project.id);
};

const createNewWhiteboard = projectId => async dispatch => {
  const response = await http.post(`/projects/${projectId}/whiteboards`);
  const whiteboard = await response.json();

  dispatch({
    type: actionNames.WHITEBOARD_CREATED,
    projectId,
    whiteboard
  });
}

const createNewView = (projectId, whiteboardId) => async dispatch => {
  const response = await http.post(`/projects/${projectId}/whiteboards/${whiteboardId}/views`);
  const view = await response.json();

  dispatch({
    type: actionNames.VIEW_CREATED,
    projectId,
    whiteboardId,
    view
  });
};

const getViewsForWhiteboard = (projectId, whiteboardId) => async (dispatch, getState) => {
  const whiteboard = findWhiteboardWithId(getState().app.projects, projectId, whiteboardId);

  if (whiteboard && whiteboard.views) return;

  const response = await http.get(`/projects/${projectId}/whiteboards/${whiteboardId}/views`);
  const views = await response.json();

  dispatch({
    type: actionNames.VIEWS_LIST_RECEIVED,
    projectId,
    whiteboardId,
    views
  });
}

const deleteView = (projectId, whiteboardId, viewId) => async dispatch => {
  const response = await http.deleteEntity(`/projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`);

  if (response.ok) {
    dispatch({
      type: actionNames.VIEW_DELETED,
      projectId,
      whiteboardId,
      viewId
    })
  }
}

export {
  actionNames,
  getAllProjects,
  createNewProject,
  createNewWhiteboard,
  createNewView,
  getViewsForWhiteboard,
  deleteView
};
