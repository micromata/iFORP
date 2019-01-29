const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? 'http://localhost:3001' : '';

const findProjectWithId = (projects, projectId) => projects.find(project => project.id === projectId);

const findWhiteboardWithId = (projects, projectId, whiteboardId) => {
  const project = findProjectWithId(projects, projectId);

  if (!project || !project.whiteboards) return null;

  return project.whiteboards.find(whiteboard => whiteboard.id === whiteboardId);
}

export {
  isDev,
  baseURL,
  findProjectWithId,
  findWhiteboardWithId
};
