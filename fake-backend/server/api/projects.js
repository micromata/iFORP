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
            params: '/details/14',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/details-14.json'
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
