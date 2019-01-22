import * as http from '../services/backendrequest.service';

const actionNames = {
  PROJECTS_RECEIVED: 'PROJECTS_RECEIVED',
  PROJECT_CREATED: 'PROJECT_CREATED'
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
};

export {
  actionNames,
  getAllProjects,
  createNewProject
};
