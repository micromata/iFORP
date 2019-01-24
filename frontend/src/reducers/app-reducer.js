import { actionNames } from '../actions/app-actions';
import { findProjectWithId, findWhiteboardWithId } from '../utils';

const initialState = {
  projects: []
};

const deepClone = obj => JSON.parse(JSON.stringify(obj));

const addWhiteboardToProject = (newState, projectId, whiteboard) => {
  const project = findProjectWithId(newState.projects, projectId);

  if (!project) throw new Error(`project with id ${projectId} not found`);

  project.whiteboards.push(whiteboard);
}

const addViewListToWhiteboard = (newState, projectId, whiteboardId, views) => {
  const whiteboard = findWhiteboardWithId(newState.projects, projectId, whiteboardId);

  if (!whiteboard) throw new Error(`whiteboard with id ${whiteboard} (project ${projectId}) not found`);

  whiteboard.views = views.map(view => {
    view.hasDetails = false;
    return view;
  });
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
      newState.projects.push(action.project);
      return newState;
    case actionNames.WHITEBOARD_CREATED:
      addWhiteboardToProject(newState, action.projectId, action.whiteboard);
      return newState;
    case actionNames.VIEWS_LIST_RECEIVED:
      addViewListToWhiteboard(newState, action.projectId, action.whiteboardId, action.views);
      return newState;
    default:
      return state;
  }
};
