const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? 'http://localhost:3001' : '';

const findProjectWithId = (projects, projectId) => projects.find(project => project.id === projectId);

const findWhiteboardWithId = (projects, projectId, whiteboardId) => {
  const project = findProjectWithId(projects, projectId);

  if (!project || !project.whiteboards) return null;

  return project.whiteboards.find(whiteboard => whiteboard.id === whiteboardId);
}

const findViewWithId = (projects, projectId, whiteboardId, viewId) => {
  const whiteboard = findWhiteboardWithId(projects, projectId, whiteboardId);

  if (!whiteboard || !whiteboard.views) return null;

  return whiteboard.views.find(view => view.id === viewId);
}

export {
  isDev,
  baseURL,
  findProjectWithId,
  findWhiteboardWithId,
  findViewWithId
};
