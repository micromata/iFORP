import React from 'react';
import {PropTypes} from 'prop-types';

export const Treeview = ({directories}) => {

	const handleDirectoryClick = (event, directoryId) => {
		event.preventDefault();
		console.log('directoryId', directoryId);
	};

	const handlePageClick = (event, pageId) => {
		event.preventDefault();
		console.log('pageId', pageId);
	};

	return (
		<ul className="list-unstyled">
			{directories.map((directory) => {
				return (
					<li key={directory.id}>
						<a href="#" onClick={event => handleDirectoryClick(event, directory.id)}>
							<span className="oi oi-chevron-bottom mr-1"></span>
							{directory.name}
						</a>
						<ul>
							{directory.pages.map((page) => {
								return <li key={page.id}><a href="#" onClick={event => handlePageClick(event, page.id)}>{page.name}</a></li>;
							})}
						</ul>
					</li>
				);
			})}
		</ul>
	);
};

Treeview.propTypes = {
	directories: PropTypes.array
};
