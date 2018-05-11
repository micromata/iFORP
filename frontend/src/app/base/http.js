import request from 'axios';

const PRODUCTION_API_PREFIX = `http://${API_HOST}:8087/api/`;
const DEVELOPMENT_API_PREFIX = `http://${API_HOST}:8087/api/`;

// PRODUCTION constant is provided by the webpack DefinePlugin via baumeister.json
const apiPrefix = PRODUCTION ? PRODUCTION_API_PREFIX : DEVELOPMENT_API_PREFIX;

async function get(url, config) {
	try {
		const {data} = await request.get(apiPrefix + url, config);
		return data;
	} catch (error) {
		console.error(error);
	}
}

async function post(url, payload, config) {
	try {
		const {data} = await request.post(apiPrefix + url, payload, config);
		return data;
	} catch (error) {
		console.error(error);
	}
}

async function patch(url, payload, config) {
	try {
		const {data} = await request.patch(apiPrefix + url, payload, config);
		return data;
	} catch (error) {
		console.error(error);
	}
}

async function put(url, payload, config) {
	try {
		const {data} = await request.put(apiPrefix + url, payload, config);
		return data;
	} catch (error) {
		console.error(error);
	}
}

/**
 * You need to pass a data object in the config parameter in case you want to send a payload.
 * Example: http.delete('/my/url', { data: { key: 'value' } });
 * See:
 * - https://github.com/axios/axios/issues/897#issuecomment-343715381
 * - https://github.com/axios/axios#request-method-aliases
 */
async function del(url, config) {
	try {
		const {data} = await request.delete(apiPrefix + url, config);
		return data;
	} catch (error) {
		console.error(error);
	}
}

export const http = {
	get,
	post,
	patch,
	put,
	delete: del
};
