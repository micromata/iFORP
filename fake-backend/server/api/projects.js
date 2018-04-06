'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'projects',
    urls: [
        {
            params: '/home',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/home.json'
            }]
        },
        {
            params: '/list',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/list.json'
            }]
        }
    ]
});
