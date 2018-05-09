import React from 'react';

import {http} from '../../../base/http';
import {FormatJson} from '../../../shared/format-json';

export class UploadForm extends React.Component {

	state = {
		file: null
	};

	handleSubmit = async event => {
		event.preventDefault();
		const response = await this.fileUpload(this.state.file);
		console.log(response);
	}

	handleChange = event => {
		const {name, size, type} = event.target.files[0];
		this.setState({
			file: {
				name,
				size,
				type
			}
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
				<input type="file" onChange={this.handleChange} />
				<button type="submit">Upload</button>
				<FormatJson formState={this.state} />
			</form>
		);
	}
}
