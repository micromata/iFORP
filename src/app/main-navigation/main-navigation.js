import React from 'react';
import {Link} from 'react-router-dom';

export const MainNavigation = () => (
	<ul>
		<li>
			<Link to="/">Home</Link>
		</li>
		<li>
			<Link to="/hello-planet">Hello Planet</Link>
		</li>
		<li>
			<Link to="/topics">Topics</Link>
		</li>
	</ul>
);
