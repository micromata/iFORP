import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../../shared/format-json';
import {http} from '../../../base/http';
import {Header} from '../shared/view.header';
import {Content} from '../shared/view.content';
import {LinkEditor} from './edit-view-link-editor';

export class EditView extends React.Component {

	state = {
		currentView: {
			id: null,
			name: '',
			htmlElementAttributes: [],
			head: '',
			body: '',
			interactionElements: [],
			css: [],
			js: []
		},
		availableViews: [],
		viewportSize: 'desktop'
	};

	handleViewportChange = updatedViewportSize => {
		this.setState({viewportSize: updatedViewportSize});
	}

	handleTargetViewChange = (interactionElementId, targetViewId) => {
		this.setState(prevState => {
			const interactionElements = prevState.currentView.interactionElements.map(element => {
				element.targetViewId = element.id === interactionElementId ? targetViewId : element.targetViewId;
				return element;
			});

			return {
				...prevState,
				currentView: {
					...prevState.currentView,
					interactionElements
				}
			};
		});
	}

	async componentDidMount() {

		// Get IDs from path params
		const {projectId, whiteboardId, viewId} = this.props.match.params;

		const currentView = await http.get(`projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`);
		const availableViews = await http.get(`projects/${projectId}/whiteboards/${whiteboardId}/views`);
		this.setState({currentView, availableViews});
	}

	render() {
		return (
			<main id="whiteboard" className="container">
				<Header name={this.state.currentView.name} projectId={this.props.match.params.projectId} whiteboardId={this.props.match.params.whiteboardId} />
				<div className="row">
					<div className="col-9">
						<div className="preview-wrapper">
							<Content
								htmlElementAttributes={this.state.currentView.htmlElementAttributes}
								head={this.state.currentView.head}
								body={this.state.currentView.body}
								css={this.state.currentView.css}
								js={this.state.currentView.js}
								viewportSize={this.state.viewportSize}
							/>
						</div>
					</div>
					<div className="col-3">
						<LinkEditor
							interactionElements={this.state.currentView.interactionElements}
							availableViews={this.state.availableViews}
							onChangeTargetView={this.handleTargetViewChange}
						/>
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
