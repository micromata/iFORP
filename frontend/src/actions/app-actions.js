import * as http from '../services/backendrequest.service';
import { findWhiteboardWithId } from '../utils';

const actionNames = {
  PROJECTS_RECEIVED: 'PROJECTS_RECEIVED',
  PROJECT_CREATED: 'PROJECT_CREATED',
  WHITEBOARD_CREATED: 'WHITEBOARD_CREATED',
  VIEW_CREATED: 'VIEW_CREATED',
  VIEWS_LIST_RECEIVED: 'VIEWS_LIST_RECEIVED',
  PROJECT_DELETED: 'PROJECT_DELETED',
  WHITEBOARD_DELETED: 'WHITEBOARD_DELETED',
  VIEW_DELETED: 'VIEW_DELETED',
  LIBRARY_DIRECTORIES_RECEIVED: 'LIBRARY_DIRECTORIES_RECEIVED',
  LIBRARY_DIRECTORY_IMPORTED: 'LIBRARY_DIRECTORY_IMPORTED',
  LIBRARY_PAGE_DETAILS_RECEIVED: 'LIBRARY_PAGE_DETAILS_RECEIVED'
};

const getAllProjects = () => async dispatch => {
  const response = await http.get('/projects');
  const projects = await response.json();

  dispatch({
    type: actionNames.PROJECTS_RECEIVED,
    projects
  });
};

const createNewProject = () => async dispatch => {
  const response = await http.post('/projects');
  const project = await response.json();

  dispatch({
    type: actionNames.PROJECT_CREATED,
    project
  });

  return project;
};

const createNewWhiteboard = projectId => async dispatch => {
  const response = await http.post(`/projects/${projectId}/whiteboards`);
  const whiteboard = await response.json();

  dispatch({
    type: actionNames.WHITEBOARD_CREATED,
    projectId,
    whiteboard
  });

  return whiteboard;
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

  return view;
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

  return views;
}

const deleteProject = projectId => async dispatch => {
  const response = await http.deleteEntity(`/projects/${projectId}`);

  if (response.ok) {
    dispatch({
      type: actionNames.PROJECT_DELETED,
      projectId
    })
  }
}

const deleteWhiteboard = (projectId, whiteboardId) => async dispatch => {
  const response = await http.deleteEntity(`/projects/${projectId}/whiteboards/${whiteboardId}`);

  if (response.ok) {
    dispatch({
      type: actionNames.WHITEBOARD_DELETED,
      projectId,
      whiteboardId
    })
  }
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

const getLibraryDirectories = () => async dispatch => {
  const response = await http.get('/library/files');
  const directories = await response.json();

  dispatch({
    type: actionNames.LIBRARY_DIRECTORIES_RECEIVED,
    directories
  });
}

const getPageDetails = pageId => async dispatch => {
  const response = await http.get(`/library/files/${pageId}`);
  const pageDetails = await response.json();

  dispatch({
    type: actionNames.LIBRARY_PAGE_DETAILS_RECEIVED,
    pageDetails
  });
}

const uploadZipFile = file => async dispatch => {
  const response = await http.uploadFile('/library/upload', file);
  const directory = await response.json();

  dispatch({
    type: actionNames.LIBRARY_DIRECTORY_IMPORTED,
    directory
  });
}

export {
  actionNames,
  getAllProjects,
  createNewProject,
  createNewWhiteboard,
  createNewView,
  getViewsForWhiteboard,
  deleteProject,
  deleteWhiteboard,
  deleteView,
  getLibraryDirectories,
  uploadZipFile,
  getPageDetails
};
