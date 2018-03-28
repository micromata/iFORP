/**
 * @file  JavaScript entry point of the project
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// Import polyfills
import {applyPolyfills} from './base/polyfills';

// Import methods from the base module
import {consoleErrorFix, ieViewportFix} from './base/base';

// Import page components
import {Home} from './home/home.page';
import {HelloPlanet} from './hello-planet/hello-planet.page';
import {Topics} from './topics/topics.page';

// Import our Sass entrypoint to create the CSS app bundle
import '../assets/scss/index.scss';

(async () => {
	// Wait with further execution until needed polyfills are loaded.
	await applyPolyfills();

	consoleErrorFix();
	ieViewportFix();

	const App = () => (
		<Router>
			<div>
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

				<hr />

				<Route exact path="/" component={Home} />
				<Route path="/hello-planet" render={(props) => <HelloPlanet {...props} planet="Mars" />} />
				<Route path="/topics" component={Topics} />
			</div>
		</Router>
	);

	ReactDOM.render(
		<App />,
		document.getElementById('root'));
})().catch(err => {
	console.error(err);
});
