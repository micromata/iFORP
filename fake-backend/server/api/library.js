'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'library',
    urls: [
        {
            params: '/directories',
            requests: [{
                method: 'GET',
                response: '/response-files/library/directories-list.json'
            }]
        }
    ]
});
