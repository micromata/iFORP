import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../../shared/format-json';
import {Header} from '../shared/library.header';
import {UploadForm} from './upload.form';

export const Upload = (props) => {

	const projectId = props.match.params.projectId;
	const whiteboardId = props.match.params.whiteboardId;
	const viewId = props.match.params.viewId;

	const handleSuccess = () => {
		props.history.push(`/library/project/${projectId}/whiteboard/${whiteboardId}/view/${viewId}`);
	};

	return (
		<main id="" className="container">
			<Header backLink={`/library/project/${projectId}/whiteboard/${whiteboardId}/view/${whiteboardId}`} />
			<div className="row">
				<div className="col-9">
					<h3>Inhalt hochladen</h3>
					<UploadForm onSuccess={handleSuccess} />
				</div>
			</div>
			<FormatJson IDs={{projectId, whiteboardId, viewId}} />
		</main>
	);
};

Upload.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
};
