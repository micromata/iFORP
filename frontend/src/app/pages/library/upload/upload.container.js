import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../../shared/format-json';
import {Header} from '../shared/library.header';
import {UploadForm} from './upload.form';

export class Upload extends React.Component {

	state = {
		view: null
	};

	projectId = this.props.match.params.projectId;

	whiteboardId = this.props.match.params.whiteboardId;

	viewId = this.props.match.params.viewId;

	async componentDidMount() {

		// Get ID from path parameters
		this.setState({view: this.viewId});
	}

	handleSuccess = () => {
		console.log('handleSuccess');
		this.props.history.push(`/library/project/${this.projectId}/whiteboard/${this.whiteboardId}/view/${this.viewId}`);
	}

	render() {
		return (
			<main id="" className="container">
				<Header projectId={this.projectId} whiteboardId={this.whiteboardId} />
				<div className="row">
					<div className="col-9">
						<h3>Template hochladen</h3>
						<UploadForm onSuccess={this.handleSuccess} />
					</div>
				</div>
				<FormatJson state={this.state} />
			</main>
		);
	}
}

Upload.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
};
