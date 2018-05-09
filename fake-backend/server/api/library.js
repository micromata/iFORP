'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'library',
    urls: [
        {
            params: '/files',
            requests: [{
                method: 'GET',
                response: '/response-files/library/files.json'
            }]
        },
        {
            params: '/upload',
            requests: [{
                method: 'POST',
                response: { status: 'ok' }
            }]
        }
    ]
});
