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

  service.hooks(hooks);
};
