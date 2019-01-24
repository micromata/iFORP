import * as http from '../services/backendrequest.service';
import { findProjectWithId, findWhiteboardWithId } from '../utils';

const actionNames = {
  PROJECTS_RECEIVED: 'PROJECTS_RECEIVED',
  PROJECT_CREATED: 'PROJECT_CREATED',
  WHITEBOARD_CREATED: 'WHITEBOARD_CREATED',
  VIEWS_LIST_RECEIVED: 'VIEWS_LIST_RECEIVED'
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

export {
  actionNames,
  getAllProjects,
  createNewProject,
  createNewWhiteboard,
  getViewsForWhiteboard
};
