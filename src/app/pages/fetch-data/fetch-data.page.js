import React from 'react';
import {Button} from 'reactstrap';

class FetchData extends React.Component {
	state = {
		fox: {
			image: null,
			link: null
		}
	};

	getRandomFox = () => {
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
				<figure>
					<img src={this.state.fox.image} alt="" />
					<figcaption><a href="{this.state.fox.link}">Quelle</a></figcaption>
				</figure>
				<Button color="primary" onClick={this.getRandomFox}>Get a another one</Button>
			</React.Fragment>
		);
	}
}

export {FetchData};
