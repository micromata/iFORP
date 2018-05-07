import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../shared/format-json';
import {Header} from './library.header';
import {http} from '../../base/http';

export class Library extends React.Component {

	state = {
		view: null,
		directories: []
	};

	async componentDidMount() {

		// Get ID from path parameters
		const {viewId} = this.props.match.params;
		this.setState({view: viewId});

		// Get directories and files from the backend
		const directories = await http.get('library/directories');
		this.setState(directories);
	}

	render() {
		return (
			<main id="" className="container">
				<Header projectId={this.props.match.params.projectId} whiteboardId={this.props.match.params.whiteboardId} />
				<div className="row">
					<div className="col-3">
						Suche und Treeview
					</div>
					<div className="col-9">
						<div className="card">
							<div className="card-body">
							HTML Preview
							</div>
						</div>
						<div className="d-flex justify-content-end mt-3">
							<button className="btn btn-primary ">Template verwenden</button>
						</div>
					</div>
				</div>
				<FormatJson state={this.state}></FormatJson>
			</main>
		);
	}
}

Library.propTypes = {
	match: PropTypes.object
};
