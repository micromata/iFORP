import React from 'react';
import {PropTypes} from 'prop-types';

import {http} from '../../base/http';
import {FormatJson} from '../../shared/format-json';
import {Header} from './whiteboards.header';
import {Views} from './whiteboards.views';

export class Whiteboards extends React.Component {

	state = {
		whiteboards: [],
		currentWhiteboard: {},
		project: {},
		views: []
	};

	getViews = async (whiteboardId) => http.get(`projects/${this.state.project.id}/whiteboards/${whiteboardId}/views`);

	deleteView = async (viewId) => {
		await http.delete(`projects/${this.state.project.id}/whiteboards/${this.state.currentWhiteboard.id}/views/${viewId}`);
		this.setState({views: [...this.state.views.filter(current => current.id !== viewId)]});
	};

	addView = async () => {
		const newView = await http.post(`projects/${this.state.project.id}/whiteboards/${this.state.currentWhiteboard.id}/views`, {name: 'New view'});
		this.setState({views: [...this.state.views, newView]});
	};

	deleteWhiteboard = async (whiteboardId) => {
		await http.delete(`projects/${this.state.project.id}/whiteboards/${whiteboardId}`);
		this.setState({whiteboards: [...this.state.whiteboards.filter(current => current.id !== whiteboardId)]});

		// Need to get the first whiteboard of the project in case the currently visited is deleted.
		if (this.state.currentWhiteboard.id === whiteboardId) {
			this.props.history.push(`/whiteboards/project-id/${this.state.project.id}/whiteboard-id/${this.state.whiteboards[0].id}`, {
				whiteboard: this.state.whiteboards[0],
				updatedWhiteboardList: true
			});
		}
	}

	createNewWhiteboard = async () => {
		const newWhiteboard = await http.post(`projects/${this.state.project.id}/whiteboards`, {name: 'New whiteboard'});
		this.setState({whiteboards: [...this.state.whiteboards, newWhiteboard]});
		this.props.history.push(`/whiteboards/project-id/${this.state.project.id}/whiteboard-id/${newWhiteboard.id}`, {
			whiteboard: newWhiteboard,
			updatedWhiteboardList: true
		});
	}

	async componentDidMount() {

		// Get project ID from path parameters
		const projectId = this.props.match.params.projectId;

		const project = await http.get(`projects/${projectId}`);
		const whiteboards = await http.get(`projects/${projectId}/whiteboards`);

		/**
		 * Need to get the whiteboard from the response in case a project is opened via
		 * /whiteboards/project-id/:projectId instead of
		 * /whiteboards/project-id/:projectId/whiteboard-id/:whiteboardId
		 */
		const whiteboardId = this.props.match.params.whiteboardId || whiteboards[0].id;
		const currentWhiteboard = whiteboards.filter(whiteboard => whiteboard.id === Number(whiteboardId))[0];
		const views = await this.getViews(currentWhiteboard.id);

		this.setState({
			project,
			whiteboards,
			currentWhiteboard,
			views
		});
	}

	async componentWillReceiveProps(nextProps) {

		const project = this.state.project;
		const whiteboards = this.state.whiteboards;

		/**
		 * Get whiteboard ID from React routers location state.
		 *
		 * This is set from:
		 *  - Click on dropdown items in whiteboards.header.js
		 *  - History pushes when creating and deleting whiteboards
		 */
		const whiteboardId = nextProps.location.state.whiteboard.id;
		const currentWhiteboard = whiteboards.filter(whiteboard => whiteboard.id === Number(whiteboardId))[0];
		const views = await this.getViews(currentWhiteboard.id);

		this.setState({
			project,
			whiteboards,
			currentWhiteboard,
			views
		});
	}

	render() {
		return (
			<main id="whiteboard" className="container">
				<Header
					project={this.state.project}
					currentWhiteboard={this.state.currentWhiteboard}
					whiteboards={this.state.whiteboards}
					onCreateNewWhiteboard={this.createNewWhiteboard}
					onDeleteWhiteboard={this.deleteWhiteboard}
				/>
				<Views
					views={this.state.views}
					onDeleteView={this.deleteView}
					onAddView={this.addView}
					projectId={this.state.project.id}
					whiteboardId={this.state.currentWhiteboard.id}
				/>
				<FormatJson
					project={this.state.project}
					whiteboards={this.state.whiteboards}
					currentWhiteboard={this.state.currentWhiteboard}
					views={this.state.views}
				/>
			</main>
		);
	}
}

Whiteboards.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object
};
