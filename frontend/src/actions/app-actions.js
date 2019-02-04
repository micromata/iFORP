import * as http from '../services/backendrequest.service';
import { findWhiteboardWithId, findViewWithId } from '../utils';
import cheerio from 'cheerio';

const actionNames = {
  PROJECTS_RECEIVED: 'PROJECTS_RECEIVED',
  PROJECT_CREATED: 'PROJECT_CREATED',
  PROJECT_RENAMED: 'PROJECT_RENAMED',
  PROJECT_DELETED: 'PROJECT_DELETED',
  WHITEBOARD_CREATED: 'WHITEBOARD_CREATED',
  WHITEBOARD_RENAMED: 'WHITEBOARD_RENAMED',
  WHITEBOARD_DELETED: 'WHITEBOARD_DELETED',
  VIEWS_LIST_RECEIVED: 'VIEWS_LIST_RECEIVED',
  VIEWS_DETAILS_RECEIVED: 'VIEWS_DETAILS_RECEIVED',
  VIEW_CREATED: 'VIEW_CREATED',
  VIEW_RENAMED: 'VIEW_RENAMED',
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

const renameProject = (projectId, newName) => async dispatch => {
  const response = await http.patch(`/projects/${projectId}`, { name: newName });
  const project = await response.json();

  dispatch({
    type: actionNames.PROJECT_RENAMED,
    projectId,
    newName
  });

  return project;
};

const deleteProject = projectId => async dispatch => {
  const response = await http.deleteEntity(`/projects/${projectId}`);

  if (response.ok) {
    dispatch({
      type: actionNames.PROJECT_DELETED,
      projectId
    })
  }
}

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

const renameWhiteboard = (projectId, whiteboardId, newName) => async dispatch => {
  const response = await http.patch(`/projects/${projectId}/whiteboards/${whiteboardId}`, { name: newName });
  const whiteboard = await response.json();

  dispatch({
    type: actionNames.WHITEBOARD_RENAMED,
    projectId,
    whiteboardId,
    newName
  });

  return whiteboard;
};

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

const renameView = (projectId, whiteboardId, viewId, newName) => async dispatch => {
  const response = await http.patch(`/projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`, { name: newName });
  const view = await response.json();

  dispatch({
    type: actionNames.VIEW_RENAMED,
    projectId,
    whiteboardId,
    viewId,
    newName
  });

  return view;
};

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

const getLibraryDirectories = () => async dispatch => {
  const response = await http.get('/library/files');
  const directories = await response.json();

  dispatch({
    type: actionNames.LIBRARY_DIRECTORIES_RECEIVED,
    directories
  });
}

const getInteractionElementsFromMarkup = markup => {
  if (!markup) return [];
  const $ = cheerio.load(markup);
  return $('[data-interaction-id]').
    map((index, element) => (
      {
        id: $(element).attr('data-interaction-id'),
        title: $(element).text().trim() || '- no text -'
      }
    )).get();
}

const getPageDetails = pageId => async dispatch => {
  const response = await http.get(`/library/files/${pageId}`);
  const pageDetails = await response.json();

  pageDetails.interactionElements = getInteractionElementsFromMarkup(pageDetails.body);

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


const getViewDetails = (projectId, whiteboardId, viewId) => async dispatch => {
  const response = await http.get(`/projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`);
  const viewDetails = await response.json();

  viewDetails.interactionElements = getInteractionElementsFromMarkup(viewDetails.body);

  return dispatch({
    type: actionNames.VIEWS_DETAILS_RECEIVED,
    projectId,
    whiteboardId,
    viewDetails
  });
}

const usePageForView = (projectId, whiteboardId, viewId, page) => async (dispatch, getState) => {
  const view = findViewWithId(getState().app.projects, projectId, whiteboardId, viewId);

  view.hasFile = true;
  view.head = page.head;
  view.body = page.body;
  view.htmlElementAttributes = page.htmlElementAttributes;
  view.assets = page.assets;
  view.viewLinks = [];

  const response = await http.put(`/projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`, view);
  const updatedView = await response.json();
  updatedView.interactionElements = getInteractionElementsFromMarkup(updatedView.body);

  return dispatch({
    type: actionNames.VIEWS_DETAILS_RECEIVED,
    projectId,
    whiteboardId,
    viewDetails: updatedView
  });
}

const saveLinksForView = (projectId, whiteboardId, viewId, links) => async (dispatch, getState) => {
  const view = findViewWithId(getState().app.projects, projectId, whiteboardId, viewId);
  const viewLinks = Object.keys(links).
    map(key => ({ interactionId: key, fromViewId: viewId, toViewId: Number(links[key])})).
    filter(link => link.toViewId);

  view.viewLinks = viewLinks;

  const response = await http.put(`/projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`, view);
  const updatedView = await response.json();
  return updatedView;
}

export {
  actionNames,
  createNewProject,
  createNewView,
  createNewWhiteboard,
  deleteProject,
  deleteView,
  deleteWhiteboard,
  getAllProjects,
  getLibraryDirectories,
  getPageDetails,
  getViewsForWhiteboard,
  renameProject,
  renameView,
  renameWhiteboard,
  uploadZipFile,
  getViewDetails,
  usePageForView,
  saveLinksForView
};
