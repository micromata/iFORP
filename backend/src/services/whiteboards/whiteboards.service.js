// Initializes the `whiteboards` service on path `/projects/whiteboards`
const createService = require('./whiteboards.class.js');
const hooks = require('./whiteboards.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/whiteboards', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('whiteboards');

  // re-export the whiteboards service on the /projects/:projectId/whiteboards route
  app.use('/projects/:projectId/whiteboards', app.service('whiteboards'));

  // A hook that updates `data` with the route parameter
  function mapProjectIdToData(context) {
    if(context.data && context.params.route.projectId) {
      context.data.projectId = context.params.route.projectId;
    }
  }

  // For the new route, map the `:projectId` route parameter to the query in a hook
  app.service('projects/:projectId/whiteboards').hooks({
    before: {
      find(context) {
        context.params.query.projectId = context.params.route.projectId;
      },
      create: mapProjectIdToData,
      update: mapProjectIdToData,
      patch: mapProjectIdToData
    }
  });

  service.hooks(hooks);
};
