import config from './config';

const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? `${window.location.protocol}//${window.location.hostname}:3001` : '';

const deepClone = obj => JSON.parse(JSON.stringify(obj));

const findProjectWithId = (projects, projectId) => projects && projects.find(project => project.id === projectId);

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

const findViewAnnotationWithId = (projects, projectId, whiteboardId, viewId, annotationId) => {
  const view = findViewWithId(projects, projectId, whiteboardId, viewId);

  if (!view || !view.annotations) return null;

  return view.annotations.find(annotation => annotation.id === annotationId);
}

const findPageWithId = (directories, pageId) => {
  return directories.reduce((pageWithId, directory) => {
    return pageWithId || (directory.pages && directory.pages.find(page => page.id === pageId));
  }, null);
}

const findImageWithId = (directories, imageId) => {
  return directories.reduce((imageWithId, directory) => {
    return imageWithId || (directory.images && directory.images.find(image => image.id === imageId));
  }, null);
}

const calculateImagePreviewOffset = (viewportSize, imageWidth) => {
  const viewportWidth = config.widthForViewportSize[viewportSize];

  if (typeof imageWidth !== 'number') return viewportWidth;

  const result = (viewportWidth - imageWidth) / 2;

  return result > 0 ? result : 0;
}

const delay = milliseconds => new Promise(resolve => {
  setTimeout(resolve, milliseconds);
})

export {
  isDev,
  baseURL,
  deepClone,
  findProjectWithId,
  findWhiteboardWithId,
  findViewWithId,
  findViewAnnotationWithId,
  findPageWithId,
  findImageWithId,
  calculateImagePreviewOffset,
  delay
};
