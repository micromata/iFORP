const assert = require('assert');
const app = require('../../src/app');

describe('\'whiteboards\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects/whiteboards');

    assert.ok(service, 'Registered the service');
  });
});
