import React from 'react';

import {ShowFox} from './show-fox';

class FetchData extends React.Component {

	/**
	 * Class properties like empyState, state, handleUpdate could also be part of the constructor(),
	 * but we don’t need to write it this way because of babel-plugin-transform-class-properties.
	 */
	emptyState = {
		fox: {
			image: null,
			link: null
		}
	};

	state = this.emptyState;

	handleUpdate = this.handleUpdate.bind(this);

	componentWillMount() {
		this.getRandomFox();
	}

	getRandomFox() {
		this.setState(this.emptyState);
		fetch('https://cors-anywhere.herokuapp.com/https://randomfox.ca/floof/')
			.then(response => response.json())
			.then(data => {
				this.setState({fox: {image: data.image, link: data.link}});
			});
	}

	handleUpdate() {
		this.getRandomFox();
	}

	render() {
		return (
			<React.Fragment>
				<h3>
					Random <span style={{fontSize: '30px', position: 'relative', top: 4}}>🦊</span>
				</h3>
				{ this.state.fox.image ? <ShowFox image={this.state.fox.image} link={this.state.fox.link} onRequestNewFox={this.handleUpdate} /> : <p>Loading …</p> }
			</React.Fragment>
		);
	}
}

export {FetchData};
