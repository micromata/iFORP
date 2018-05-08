import React from 'react';
import {PropTypes} from 'prop-types';
import {Alert} from 'reactstrap';

import {FormatJson} from '../../shared/format-json';
import {Header} from './library.header';
import {http} from '../../base/http';
import {Treeview} from './library.treeview';

export class Library extends React.Component {

	state = {
		view: null,
		directories: [],
		selectedPageId: null
	};

	handlePageClick = pageId => {
		this.setState({selectedPageId: pageId});
	}

	handleUploadClick = event => {
		event.preventDefault();
	}

	async componentDidMount() {

		// Get ID from path parameters
		const {viewId} = this.props.match.params;
		this.setState({view: viewId});

		// Get directories and files from the backend
		const directories = await http.get('library/files');
		this.setState(directories);
	}

	render() {
		return (
			<main id="" className="container">
				<Header projectId={this.props.match.params.projectId} whiteboardId={this.props.match.params.whiteboardId} />
				<div className="row">
					<div className="col-3">
						{this.state.directories.length ? <Treeview
							onPageSelection={this.handlePageClick}
							directories={this.state.directories}
							selectedPageId={this.state.selectedPageId}
						/> : false}
						<a href="#" onClick={this.handleUploadClick} className="btn btn-secondary btn-sm">Neues template hochladen</a>
					</div>
					<div className="col-9">
						{this.state.selectedPageId ?
							<p><code>TODO: iframe der ausgewählten Seite einbinden.</code></p> :
							this.state.directories.length ?
								<Alert color="info">
									Bitte wählen Sie in der linken Spalte ein Template aus um fortzufahren.
								</Alert> :
								<Alert color="warning">
									Bitte laden Sie zunächst ein Template hoch um fortzufahren.
								</Alert>
						}
						<div className="d-flex justify-content-end mt-3">
							<button className="btn btn-primary" disabled={!this.state.selectedPageId}>Template verwenden</button>
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
