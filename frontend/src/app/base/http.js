import request from 'axios';

const PRODUCTION_API_PREFIX = 'http://localhost:8087/api/';
const DEVELOPMENT_API_PREFIX = 'http://localhost:8087/api/';

// PRODUCTION constant is provided by the webpack DefinePlugin via baumeister.json
const apiPrefix = PRODUCTION ? PRODUCTION_API_PREFIX : DEVELOPMENT_API_PREFIX;

export async function get(url) {
	try {
		const {data} = await request.get(apiPrefix + url);
		return data;
	} catch (error) {
		console.error(error);
	}
}
