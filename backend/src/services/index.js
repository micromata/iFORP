const projects = require('./projects/projects.service.js');
const whiteboards = require('./whiteboards/whiteboards.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(projects);
  app.configure(whiteboards);
};
