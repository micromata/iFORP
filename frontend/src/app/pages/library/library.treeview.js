import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../shared/format-json';

export class Treeview extends React.Component {

	state = {
		collapsed: {}
	};

	handleDirectoryClick = (event, directoryId) => {
		event.preventDefault();
		console.log('directoryId', directoryId);
		this.setState({
			collapsed: {
				...this.state.collapsed,
				[directoryId]: this.state.collapsed[directoryId] === false
			}
		});
	};

	handlePageClick = (event, pageId) => {
		event.preventDefault();
		console.log('pageId', pageId);
	};

	componentDidMount() {
		const initialCollapsedState = {};
		this.props.directories.forEach(directory => {
			initialCollapsedState[directory.id] = true;
		});

		this.setState({collapsed: initialCollapsedState});
	}

	render() {
		return (
			<React.Fragment>
				<ul className="list-unstyled">
					{this.props.directories.map((directory) => {
						return (
							<li key={directory.id}>
								<a href="#" onClick={event => this.handleDirectoryClick(event, directory.id)}>
									<span className="oi oi-chevron-bottom mr-1"></span>
									{directory.name}
								</a>
								<ul>
									{directory.pages.map((page) => {
										return <li key={page.id}><a href="#" onClick={event => this.handlePageClick(event, page.id)}>{page.name}</a></li>;
									})}
								</ul>
							</li>
						);
					})}
				</ul>
				<FormatJson state={this.state}></FormatJson>
			</React.Fragment>
		);
	}
}

Treeview.propTypes = {
	directories: PropTypes.array
};
