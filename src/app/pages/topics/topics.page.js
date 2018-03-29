import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link, Switch} from 'react-router-dom';

import {Topic} from './topic/topic.page';
import {Error} from '../error/error.page';

export const Topics = ({match}) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>Rendering with React</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>Components</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>Props v. State</Link>
			</li>
		</ul>

		<Switch>
			<Route exact path={`${match.path}/:topicId`} component={Topic} />
			<Route exact path={match.path} render={() => <h3>Please select a topic.</h3>} />
			<Route render={props => <Error {...props} code="404" message="Page not found" />} />
		</Switch>
	</div>
);

Topics.propTypes = {
	match: PropTypes.object
};
