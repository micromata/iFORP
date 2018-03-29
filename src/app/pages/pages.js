import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Import page components
import {Home} from './home/home.page';
import {HelloPlanet} from './hello-planet/hello-planet.page';
import {Topics} from './topics/topics.page';
import {Error} from './error/error.page';
import {ClassComponent} from './class-component/class-component.page';
import {FetchData} from './fetch-data/fetch-data.page';

export const Pages = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/hello-planet" render={props => <HelloPlanet {...props} planet="Mars" />} />
			<Route path="/topics" component={Topics} />
			<Route path="/class-component" component={ClassComponent} />
			<Route path="/fetch-data" component={FetchData} />
			<Route render={props => <Error {...props} code="404" message="Page not found" />} />
		</Switch>
	</React.Fragment>
);
