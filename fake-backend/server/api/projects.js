'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'projects',
    urls: [
        {
            params: '/list',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/list.json'
            }]
        },
        {
            params: '/details/{projectId}',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/details.json'
            }]
        },
        {
            params: '/create',
            requests: [{
                /**
                 * Payload:
                 * {
                 *   name: string
                 * }
                 */
                method: 'POST',
                response: '/response-files/projects/create.json'
            }]
        }
    ]
});
