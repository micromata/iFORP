import { actionNames } from '../actions/app-actions';
import { findProjectWithId, findWhiteboardWithId } from '../utils';

const initialState = {
  projects: []
};

const deepClone = obj => JSON.parse(JSON.stringify(obj));

const updateHasDetailsFlagOfViews = project => {
  if (!project || !project.whiteboards) return project;

  const clonedProject = deepClone(project);

  clonedProject.whiteboards = clonedProject.whiteboards.
    map(whiteboard => {
      if (!whiteboard.views) return whiteboard;

      whiteboard.views.map(view => {
        view.hasDetails = view.hasOwnProperty('body'); // eslint-disable-line no-prototype-builtins
        return view;
      })

      return whiteboard;
    });

  return clonedProject;
};

const addWhiteboardToProject = (newState, projectId, whiteboard) => {
  const project = findProjectWithId(newState.projects, projectId);

  if (!project) throw new Error(`project with id ${projectId} not found`);

  project.whiteboards.push(whiteboard);
}

const setViewListOfWhiteboard = (newState, projectId, whiteboardId, views) => {
  const whiteboard = findWhiteboardWithId(newState.projects, projectId, whiteboardId);

  if (!whiteboard) throw new Error(`whiteboard with id ${whiteboardId} (project ${projectId}) not found`);

  whiteboard.views = views.map(view => {
    view.hasDetails = false;
    return view;
  });
}

const addViewToWhiteboard = (newState, projectId, whiteboardId, view) => {
  const whiteboardForView = findWhiteboardWithId(newState.projects, projectId, whiteboardId);

  if (!whiteboardForView) throw new Error(`whiteboard with id ${whiteboardId} (project ${projectId}) not found`);

  const { whiteboard, ...viewToAdd } = view;
  viewToAdd.hasDetails = true;
  whiteboardForView.views.push(viewToAdd);
}

const removeWhiteboardFromProject = (newState, projectId, whiteboardId) => {
  const project = findProjectWithId(newState.projects, projectId);

  if (!project) throw new Error(`project with id ${projectId} not found`);
  if (!project.whiteboards) return;

  project.whiteboards = project.whiteboards.filter(whiteboard => whiteboard.id !== whiteboardId);
}

const removeViewFromWhiteboard = (newState, projectId, whiteboardId, viewId) => {
  const whiteboard = findWhiteboardWithId(newState.projects, projectId, whiteboardId);

  if (!whiteboard) throw new Error(`whiteboard with id ${whiteboardId} (project ${projectId}) not found`);
  if (!whiteboard.views) return;

  whiteboard.views = whiteboard.views.filter(view => view.id !== viewId);
}

export default (state = initialState, action) => {
  const newState = deepClone(state);

  switch(action.type) {
    case actionNames.PROJECTS_RECEIVED:
      return {
        ...newState,
        projects: action.projects
      };
    case actionNames.PROJECT_CREATED:
      newState.projects.push(updateHasDetailsFlagOfViews(action.project));
      return newState;
    case actionNames.WHITEBOARD_CREATED:
      addWhiteboardToProject(newState, action.projectId, action.whiteboard);
      return newState;
    case actionNames.VIEWS_LIST_RECEIVED:
      setViewListOfWhiteboard(newState, action.projectId, action.whiteboardId, action.views);
      return newState;
    case actionNames.VIEW_CREATED:
      addViewToWhiteboard(newState, action.projectId, action.whiteboardId, action.view);
      return newState;
    case actionNames.PROJECT_DELETED:
      newState.projects = newState.projects.filter(project => project.id !== action.projectId);
      return newState;
    case actionNames.WHITEBOARD_DELETED:
      removeWhiteboardFromProject(newState, action.projectId, action.whiteboardId);
      return newState;
    case actionNames.VIEW_DELETED:
      removeViewFromWhiteboard(newState, action.projectId, action.whiteboardId, action.viewId);
      return newState;
    default:
      return state;
  }
};
