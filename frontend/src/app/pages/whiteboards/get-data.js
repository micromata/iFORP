import {http} from '../../base/http';

export async function getWhiteboards(projectId) {
	return http.get(`whiteboards/list/${projectId}`);
}

export async function getViews(currentWhiteboard) {
	return http.get(`views/list/${currentWhiteboard.id}`);
}

export async function getProject(projectId) {
	return http.get(`projects/details/${projectId}`);
}
