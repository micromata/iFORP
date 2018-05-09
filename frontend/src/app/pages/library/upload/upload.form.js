import React from 'react';
import {Alert} from 'reactstrap';

import {http} from '../../../base/http';
import {FormatJson} from '../../../shared/format-json';
import {PropTypes} from 'prop-types';

export class UploadForm extends React.Component {

	validFileTypes = ['application/zip'];

	state = {
		file: null,
		valid: false
	};

	handleSuccess = () => {
		console.log('handleSuccess');
		this.props.onSuccess();
	}

	handleSubmit = async event => {
		event.preventDefault();
		const response = await this.fileUpload(this.state.file);
		console.log(response);
		this.handleSuccess();
	}

	handleChange = event => {
		const file = event.target.files[0];
		this.setState({
			file,
			valid: this.validFileTypes.includes(file.type)
		});
	}

	fileUpload(file) {
		const formData = new FormData();
		formData.append('file', file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		return http.post('library/upload', formData, config);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Alert color="info">
					Akzeptierte Dateiformate: *.zip
				</Alert>
				{this.state.file && !this.state.valid &&
					<Alert color="danger">
						Datei kann nicht hochgeladen werden: Falsches Dateiformat.
					</Alert>
				}
				<div className="row">
					<div className="col-10">
						<div className="custom-file">
							<input type="file" onChange={this.handleChange} accept={this.validFileTypes} className="custom-file-input" id="fileInput" />
							<label className="custom-file-label" htmlFor="fileInput">
								{this.state.file ? this.state.file.name : 'Datei auswählen'}
							</label>
						</div>
					</div>
					<div className="col-2 d-flex">
						<button className="btn btn-primary flex-grow-1" type="submit" disabled={!this.state.valid}>Upload</button>
					</div>
				</div>
				<FormatJson formState={this.state} />
			</form>
		);
	}
}

UploadForm.propTypes = {
	history: PropTypes.object,
	onSuccess: PropTypes.func
};
