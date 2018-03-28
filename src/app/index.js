/**
 * @file  JavaScript entry point of the project
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// Import polyfills
import {applyPolyfills} from './base/polyfills';

// Import methods from the base module
import {consoleErrorFix, ieViewportFix} from './base/base';

// Import our Sass entrypoint to create the CSS app bundle
import '../assets/scss/index.scss';

(async () => {
	// Wait with further execution until needed polyfills are loaded.
	await applyPolyfills();

	consoleErrorFix();
	ieViewportFix();

	const Home = () => (
		<div>
			<h2>Home</h2>
		</div>
	);

	const HelloPlanet = (props) => (
		<React.Fragment>
			<p>Hello {props.planet || 'World'}!</p>
			<Button color="primary">Okay</Button>
		</React.Fragment>
	);

	HelloPlanet.propTypes = {
		planet: PropTypes.string
	};

	const Topic = ({match}) => (
		<div>
			<h3>{match.params.topicId}</h3>
		</div>
	);

	Topic.propTypes = {
		match: PropTypes.object
	};

	const Topics = ({match}) => (
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

			<Route path={`${match.path}/:topicId`} component={Topic} />
			<Route exact path={match.path} render={() => <h3>Please select a topic.</h3>} />
		</div>
	);

	Topics.propTypes = {
		match: PropTypes.object
	};

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
