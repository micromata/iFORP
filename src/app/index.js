/**
 * @file  JavaScript entry point of the project
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

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

	function HelloPlanet(props) {
		return (
			<React.Fragment>
				<p>Hello {props.planet || 'World'}!</p>
				<Button color="primary">Okay</Button>
			</React.Fragment>
		);
	}

	HelloPlanet.propTypes = {
		planet: PropTypes.string
	};

	ReactDOM.render(
		<HelloPlanet planet="Mars" />,

		document.getElementById('root')
	);

})().catch(err => {
	console.error(err);
});
