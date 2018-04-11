import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Import page components
import {Home} from './home/home.container';
import {Error} from './error/error.container';
import {Projects} from './projects/projects.container';
import {Whiteboards} from './whiteboards/whiteboards.container';

export const Pages = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/projects" component={Projects} />
			<Route exact path="/whiteboards/project-id/:projectId/whiteboard-id/:whiteboardId" component={Whiteboards} />
			<Route exact path="/whiteboards/project-id/:projectId" component={Whiteboards} />
			<Route render={props => <Error {...props} code="404" message="Page not found" />} />
		</Switch>
	</React.Fragment>
);
