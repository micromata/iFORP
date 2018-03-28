import React from 'react';
import {Route} from 'react-router-dom';

// Import page components
import {Home} from '../home/home.page';
import {HelloPlanet} from '../hello-planet/hello-planet.page';
import {Topics} from '../topics/topics.page';

export const MainNavigationContent = () => (
	<React.Fragment>
		<Route exact path="/" component={Home} />
		<Route path="/hello-planet" render={(props) => <HelloPlanet {...props} planet="Mars" />} />
		<Route path="/topics" component={Topics} />
	</React.Fragment>
);
