import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, NavLink, Switch} from 'react-router-dom';

import {Topic} from './topic/topic.page';
import {Error} from '../error/error.page';

export const Topics = ({match}) => (
	<div>
		<h2>Topics</h2>
		<ul className="nav nav-tabs">
			<li className="nav-item">
				<NavLink className="nav-link" to={`${match.url}/rendering`}>Rendering with React</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" to={`${match.url}/components`}>Components</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" to={`${match.url}/props-v-state`}>Props v. State</NavLink>
			</li>
		</ul>

		<Switch>
			<Route exact path={`${match.path}/:topicId`} component={Topic} />
			{/* <Route exact path={match.path} render={() => <div className="p-4"><p>Please select a topic.</p></div>} /> */}
			<Redirect from="/topics" to="/topics/rendering" />
			<Route render={props => <Error {...props} code="404" message="Page not found" />} />
		</Switch>
	</div>
);

Topics.propTypes = {
	match: PropTypes.object
};
