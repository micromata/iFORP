import { actionNames } from '../actions/app-actions';

const initialState = {
  projects: []
};

const deepClone = obj => JSON.parse(JSON.stringify(obj));

export default (state = initialState, action) => {
  const newState = deepClone(state);

  switch(action.type) {
    case actionNames.PROJECTS_RECEIVED:
      return {
        ...newState,
        projects: action.projects
      };
    case actionNames.PROJECT_CREATED:
      return {
        ...newState,
        projects: [ ...state.projects, action.project ]
      };
    case actionNames.WHITEBOARD_CREATED:
      return {
        ...newState,
        projects: newState.projects.map(project => {
          if (project.id === action.projectId) {
            project.whiteboards.push(action.whiteboard);
          }

          return project;
        })
      };
    default:
      return state;
  }
};
