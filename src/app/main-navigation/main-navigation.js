import React from 'react';
import {NavLink} from 'react-router-dom';

export const MainNavigation = () => (
	<ul className="nav">
		<li className="nav-item">
			<NavLink exact className="nav-link" to="/">Home</NavLink>
		</li>
		<li className="nav-item">
			<NavLink className="nav-link" to="/hello-planet">Hello Planet</NavLink>
		</li>
		<li className="nav-item">
			<NavLink className="nav-link" to="/class-component">Class Component</NavLink>
		</li>
		<li className="nav-item">
			<NavLink className="nav-link" to="/fetch-data">Fetch Data</NavLink>
		</li>
		<li className="nav-item">
			<NavLink className="nav-link" to="/topics">Topics</NavLink>
		</li>
	</ul>
);
