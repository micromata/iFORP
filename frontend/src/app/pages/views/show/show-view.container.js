import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../../shared/format-json';
import {http} from '../../../base/http';
import {Header} from './show-view.header';
import {ViewportChanger} from './show-view.viewport-changer';
import {Content} from './show-view.content';

export class ShowView extends React.Component {

	state = {
		view: {
			id: null,
			name: '',
			head: '',
			body: '',
			js: []
		},
		viewportSize: 'desktop'
	};

	handleViewportChange = (updatedViewportSize) => {
		console.log('updatedViewportSize =', updatedViewportSize);
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
				<Header name={this.state.view.name} />
				<ViewportChanger viewportSize={this.state.viewportSize} onSizeChange={this.handleViewportChange} />
				<div className="row">
					<div className="col-12">
						<div className="preview-wrapper">
							<Content
								head={this.state.view.head}
								body={this.state.view.body}
								js={this.state.view.js}
								viewportSize={this.state.viewportSize}
							/>
						</div>
					</div>
				</div>
				<FormatJson state={this.state}></FormatJson>
			</main>
		);
	}
}

ShowView.propTypes = {
	match: PropTypes.object
};
