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

import {MainNavigationNavbar} from './main-navigation/main-navigation.navbar';
import {MainNavigationContent} from './main-navigation/main-navigation-content';

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
				<MainNavigationNavbar />
				<hr />
				<MainNavigationContent />
			</React.Fragment>
		</Router>
	);

	ReactDOM.render(
		<App />,
		document.getElementById('root'));
})().catch(err => {
	console.error(err);
});
