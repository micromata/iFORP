'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'views',
    urls: [
        {
            params: '/list/{viewId}',
            requests: [{
                method: 'GET',
                response: '/response-files/views/list.json'
            }]
        },
        {
            params: '/list/1',
            requests: [{
                method: 'GET',
                response: '/response-files/views/list-1.json'
            }]
        },
        {
            params: '/list/2',
            requests: [{
                method: 'GET',
                response: '/response-files/views/list-2.json'
            }]
        }
    ]
});
