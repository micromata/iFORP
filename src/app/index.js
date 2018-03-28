/**
 * @file  JavaScript entry point of the project
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from 'react-router-dom';

// Import polyfills
import {applyPolyfills} from './base/polyfills';

// Import methods from the base module
import {consoleErrorFix, ieViewportFix} from './base/base';

import {MainNavigation} from './main-navigation/main-navigation';
import {Pages} from './pages/pages';

// Import our Sass entrypoint to create the CSS app bundle
import '../assets/scss/index.scss';

(async () => {
	// Wait with further execution until needed polyfills are loaded.
	await applyPolyfills();

	consoleErrorFix();
	ieViewportFix();

	const App = () => (
		<Router>
			<React.Fragment>
				<MainNavigation />
				<hr />
				<Pages />
			</React.Fragment>
		</Router>
	);

	ReactDOM.render(
		<App />,
		document.getElementById('root'));
})().catch(err => {
	console.error(err);
});
