import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  // Get all projects
  res.send('Not implemented!');
});

router.post('/', (req, res) => {
  // Add project
  res.send('Not implemented!');
});

router.get('/:projectId', (req, res) => {
  // Get project by id
  res.send('Not implemented!');
});

router.patch('/:projectId', (req, res) => {
  // Change project by id
  res.send('Not implemented!');
});

router.get('/:projectId/whiteboards', (req, res) => {
  // Get all whiteboards of project
  res.send('Not implemented!');
});

router.post('/:projectId/whiteboards', (req, res) => {
  // Add whiteboard to project
  res.send('Not implemented!');
});

router.delete('/:projectId/whiteboards/:whiteboardId', (req, res) => {
  // Delete whiteboard from project
  res.send('Not implemented!');
});

router.patch('/:projectId/whiteboards/:whiteboardId', (req, res) => {
  // Change whiteboard
  res.send('Not implemented!');
});

router.get('/:projectId/whiteboards/:whiteboardId/views', (req, res) => {
  // Get all whiteboard views
  res.send('Not implemented!');
});

router.post('/:projectId/whiteboards/:whiteboardId/views', (req, res) => {
  // Add view to whiteboard
  res.send('Not implemented!');
});

router.get(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Get whiteboard view by id
    res.send('Not implemented!');
  }
);

router.delete(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Delete whiteboard view by id
    res.send('Not implemented!');
  }
);

router.patch(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Modify whiteboard view by id
    res.send('Not implemented!');
  }
);

router.put(
  '/:projectId/whiteboards/:whiteboardId/views/:viewId',
  (req, res) => {
    // Replace whiteboard view by id
    res.send('Not implemented!');
  }
);

export default router;
