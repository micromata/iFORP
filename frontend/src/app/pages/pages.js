import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Import page components
import {Home} from './home/home.page';
import {Error} from './error/error.page';
import {Projects} from './projects/projects.page';

export const Pages = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/projects" component={Projects} />
			<Route render={props => <Error {...props} code="404" message="Page not found" />} />
		</Switch>
	</React.Fragment>
);
