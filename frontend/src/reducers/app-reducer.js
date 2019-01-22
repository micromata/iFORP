import { actionNames } from '../actions/app-actions';

const initialState = {
  projects: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionNames.PROJECTS_RECEIVED:
      return {
        ...state,
        projects: action.projects
      };
    case actionNames.PROJECT_CREATED:
      return {
        ...state,
        projects: [ ...state.projects, action.project ]
      };
    default:
      return state;
  }
};
