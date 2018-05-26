import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../../shared/format-json'; // eslint-disable-line no-unused-vars
import {http} from '../../../base/http';
import {Header} from '../shared/view.header';
import {ViewportChanger} from './show-viewport-changer';
import {Iframe} from '../../../shared/iframe';

export class ShowView extends React.Component {

	state = {
		view: {
			id: null,
			name: '',
			htmlElementAttributes: [],
			head: '',
			body: '',
			assets: []
		},
		viewportSize: 'desktop'
	};

	handleViewportChange = updatedViewportSize => {
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
				<ViewportChanger viewportSize={this.state.viewportSize} onSizeChange={this.handleViewportChange} />
				<div className="row">
					<div className="col-12">
						<Iframe
							htmlElementAttributes={this.state.view.htmlElementAttributes || []}
							head={this.state.view.head}
							body={this.state.view.body}
							assets={this.state.view.assets}
							viewportSize={this.state.viewportSize}
						/>
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
