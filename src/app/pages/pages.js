import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Import page components
import {Home} from './home/home.page';
import {Error} from './error/error.page';

export const Pages = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route render={props => <Error {...props} code="404" message="Page not found" />} />
		</Switch>
	</React.Fragment>
);
