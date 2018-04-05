import React from 'react';

import {NewProject} from './new-project';
import {ProjectList} from './project-list';

const data = [
	{
		id: 1,
		name: 'Project 1',
		thumbnail: 'http://via.placeholder.com/200x150'
	},
	{
		id: 2,
		name: 'Project 2',
		thumbnail: 'http://via.placeholder.com/200x150'
	},
	{
		id: 3,
		name: 'Project 3',
		thumbnail: 'http://via.placeholder.com/200x150'
	}
];

export const Home = () => (
	<main id="start" className="container">
		<NewProject />
		<ProjectList projects={data} />
	</main>
);
