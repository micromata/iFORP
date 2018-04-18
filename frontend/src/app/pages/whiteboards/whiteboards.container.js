import React from 'react';
import {PropTypes} from 'prop-types';

import {http} from '../../base/http';
import {getWhiteboards, getViews, getProject} from './get-data';
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

	deleteView = async (viewId) => {
		this.setState({views: await http.delete(`views/delete/${viewId}`)});
	};

	addView = async () => {
		this.setState({views: await http.post(`views/create/${this.state.currentWhiteboard.id}`, {name: 'New view'})});

	};

	deleteWhiteboard = async (whiteboard) => {
		await http.delete(`whiteboards/delete/${whiteboard.id}`);

		// Need to get the first whiteboard of the project in case the currently visited is deleted.
		if (this.state.currentWhiteboard.id === whiteboard.id) {
			this.setState({whiteboards: [...this.state.whiteboards.filter(current => current.id !== whiteboard.id)]});
			this.props.history.push(`/whiteboards/project-id/${this.state.project.id}/whiteboard-id/${this.state.whiteboards[0].id}`, {
				whiteboard: this.state.whiteboards[0],
				updatedWhiteboardList: true
			});
		} else {
			this.setState({whiteboards: [...this.state.whiteboards.filter(current => current.id !== whiteboard.id)]});
		}
	}

	createNewWhiteboard = async () => {
		const newWhiteboard = await http.post(`whiteboards/create/${this.state.project.id}`, {name: 'New whiteboard'});
		this.setState({whiteboards: [...this.state.whiteboards, newWhiteboard]});
		this.props.history.push(`/whiteboards/project-id/${this.state.project.id}/whiteboard-id/${newWhiteboard.id}`, {
			whiteboard: newWhiteboard,
			updatedWhiteboardList: true
		});
	}

	async componentDidMount() {

		// Get project ID from path parameters
		const projectId = this.props.match.params.projectId;

		const project = await getProject(projectId);
		const whiteboards = await getWhiteboards(projectId);

		/**
		 * Need to get the whiteboard from the response in case a project is opened via
		 * /whiteboards/project-id/:projectId instead of
		 * /whiteboards/project-id/:projectId/whiteboard-id/:whiteboardId
		 */
		const whiteboardId = this.props.match.params.whiteboardId || whiteboards[0].id;
		const currentWhiteboard = whiteboards.filter(whiteboard => whiteboard.id === Number(whiteboardId))[0];
		const views = await getViews(currentWhiteboard);
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
		const views = await getViews(currentWhiteboard);

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
