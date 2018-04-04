import React from 'react';

import {ShowFox} from './show-fox';

class FetchData extends React.Component {
	emptyState = {
		fox: {
			image: null,
			link: null
		}
	};

	state = this.emptyState;

	resetState = () => {
		this.setState(this.emptyState);
	}

	getRandomFox = () => {
		this.resetState();
		fetch('https://cors-anywhere.herokuapp.com/https://randomfox.ca/floof/')
			.then(response => response.json())
			.then(data => {
				this.setState({fox: {image: data.image, link: data.link}});
			});
	};

	componentWillMount() {
		this.getRandomFox();
	}

	render() {
		return (
			<React.Fragment>
				<h3>
					Random <span style={{fontSize: '30px', position: 'relative', top: 4}}>🦊</span>
				</h3>
				{ this.state.fox.image ? <ShowFox image={this.state.fox.image} link={this.state.fox.link} update={this.getRandomFox} /> : <p>Loading …</p> }
			</React.Fragment>
		);
	}
}

export {FetchData};
