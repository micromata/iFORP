'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'whiteboards',
    urls: [
        {
            params: '/list/{projectId}',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/list.json'
            }]
        },
        {
            params: '/details/{whiteboardId}',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/details.json'
            }]
        }
    ]
});
