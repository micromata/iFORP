import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

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
				{ this.state.fox.image ? <ShowFox image={this.state.fox.image} link={this.state.fox.link} /> : <p>Loading …</p> }
				<Button color="primary" onClick={this.getRandomFox}>Get a another one</Button>
			</React.Fragment>
		);
	}
}

const ShowFox = (props) => (
	<figure>
		<img src={props.image} alt="" />
		<figcaption><a href={props.link}>Quelle</a></figcaption>
	</figure>
);

ShowFox.propTypes = {
	image: PropTypes.string,
	link: PropTypes.string
};

export {FetchData};
