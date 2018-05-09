'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    // statusCode: 401,
    name: 'projects',
    urls: [
        {
            params: '',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/list.json'
            },
            {
                /**
                 * Payload:
                 * {
                 *   name: string
                 * }
                 */
                method: 'POST',
                response: '/response-files/projects/create.json'
            }]
        },
        {
            params: '/{projectId}',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/details.json'
            }]
        },
        {
            params: '/14',
            requests: [{
                method: 'GET',
                response: '/response-files/projects/details-14.json'
            }]
        },

        /**
         * Whiteboards
         */
        {
            params: '/{projectId}/whiteboards',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/list.json'
            },
            {
                /**
                 * Payload:
                 * {
                 *   name: string
                 * }
                 */
                method: 'POST',
                response: '/response-files/whiteboards/create.json'
            }]
        },
        {
            params: '/14/whiteboards',
            requests: [{
                method: 'GET',
                response: '/response-files/whiteboards/list-14.json'
            }]
        },
        {
            params: '/{projectId}/whiteboards/{whiteboardId}',
            requests: [{
                method: 'DELETE',
                response: { ok: 'ok' }
            }]
        },

        /**
         * Views
         */
        {
            params: '/{projectId}/whiteboards/{whiteboardId}/views',
            requests: [
                {
                    method: 'GET',
                    response: '/response-files/views/list.json'
                },
                {
                    /**
                     * Payload:
                     * {
                     *   name: string
                     * }
                     */
                    method: 'POST',
                    response: '/response-files/views/create.json'
                }
            ]
        },
        {
            params: '/{projectId}/whiteboards/{whiteboardId}/views/{viewId}',
            requests: [
                {
                    method: 'GET',
                    response: '/response-files/views/detail.json'
                },
                {
                    method: 'DELETE',
                    response: { ok: 'ok' }
                },
                {
                    // Payload: Array of interaction elements.
                    // See: /frontend/src/app/pages/views/edit/edit-view.container.js
                    method: 'PATCH',
                    response: '/response-files/views/patched.json'
                },
                {
                    // Payload: HTML content properties.
                    // See: /frontend/src/app/pages/library/library.container.js
                    method: 'PUT',
                    response: '/response-files/views/patched.json'
                }
            ]
        },

        // Fake dummy routes
        {
            params: '/{projectId}/whiteboards/1/views',
            requests: [{
                method: 'GET',
                response: '/response-files/views/list-1.json'
            }]
        },
        {
            params: '/{projectId}/whiteboards/2/views',
            requests: [{
                method: 'GET',
                response: '/response-files/views/list-2.json'
            }]
        },
        {
            params: '/{projectId}/whiteboards/3/views',
            requests: [{
                method: 'GET',
                response: '/response-files/views/list-3.json'
            }]
        }
    ]
});
