import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Import page components
import {Home} from './home/home.container';
import {Error} from './error/error.container';
import {Projects} from './projects/projects.container';
import {Whiteboards} from './whiteboards/whiteboards.container';
import {ShowView} from './views/show/show-view.container';
import {EditView} from './views/edit/edit-view.container';
import {Library} from './library/library.container';

export const Pages = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/projects" component={Projects} />
			<Route exact path="/whiteboards/project/:projectId/whiteboard/:whiteboardId" component={Whiteboards} />
			<Route exact path="/whiteboards/project/:projectId" component={Whiteboards} />
			<Route exact path="/views/show/project/:projectId/whiteboard/:whiteboardId/view/:viewId" component={ShowView} />
			<Route exact path="/views/edit/view/:viewId" component={EditView} />
			<Route exact path="/library/view/:viewId" component={Library} />
			<Route render={props => <Error {...props} code="404" message="Page not found" />} />
		</Switch>
	</React.Fragment>
);
