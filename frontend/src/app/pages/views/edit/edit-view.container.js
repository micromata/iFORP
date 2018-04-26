import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../../shared/format-json';
import {http} from '../../../base/http';
import {Header} from '../shared/view.header';
import {Content} from '../shared/view.content';
import {LinkEditor} from './edit-view-link-editor';

export class EditView extends React.Component {

	state = {
		view: {
			id: null,
			name: '',
			htmlElementAttributes: [],
			head: '',
			body: '',
			interactionElements: [],
			css: [],
			js: []
		},
		viewportSize: 'desktop'
	};

	handleViewportChange = (updatedViewportSize) => {
		this.setState({viewportSize: updatedViewportSize});
	}

	async componentDidMount() {

		// Get ID from path parameters
		const {viewId} = this.props.match.params;
		const view = await http.get(`projects/{projectId}/whiteboards/{whiteboardId}/views/${viewId}`);
		this.setState({view});
	}

	render() {
		return (
			<main id="whiteboard" className="container">
				<Header name={this.state.view.name} projectId={this.props.match.params.projectId} whiteboardId={this.props.match.params.whiteboardId} />
				<div className="row">
					<div className="col-9">
						<div className="preview-wrapper">
							<Content
								htmlElementAttributes={this.state.view.htmlElementAttributes}
								head={this.state.view.head}
								body={this.state.view.body}
								css={this.state.view.css}
								js={this.state.view.js}
								viewportSize={this.state.viewportSize}
							/>
						</div>
					</div>
					<div className="col-3">
						<LinkEditor interactionElements={this.state.view.interactionElements} />
					</div>
				</div>
				<FormatJson state={this.state}></FormatJson>
			</main>
		);
	}
}

EditView.propTypes = {
	match: PropTypes.object
};
