const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? 'http://localhost:3001' : '';

const deepClone = obj => JSON.parse(JSON.stringify(obj));

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

const findPageWithId = (directories, pageId) => {
  return directories.reduce((pageWithId, directory) => {
    return pageWithId || directory.pages.find(page => page.id === pageId);
  }, null);
}

export {
  isDev,
  baseURL,
  deepClone,
  findProjectWithId,
  findWhiteboardWithId,
  findViewWithId,
  findPageWithId
};
