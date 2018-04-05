import React from 'react';
import {Button} from 'reactstrap';
import {PropTypes} from 'prop-types';

class Counter extends React.Component {
	state = {count: this.props.start || 0}

	decrementIsDisabled = () => this.state.count === 0;

	decrement = () => {
		this.setState(prevState => ({count: prevState.count === 0 ? prevState.count : prevState.count - 1}));
	}

	increment = () => {
		this.setState({count: this.state.count + 1});
	}

	render() {
		return (
			<React.Fragment>
				<h3>{this.props.title || 'Counter'}</h3>
				<p>Count: {this.state.count}</p>
				<div className="btn-group mb-4">
					<Button disabled={this.decrementIsDisabled()} color="primary" onClick={this.decrement}>-</Button>
					<Button color="primary" onClick={this.increment}>+</Button>
				</div>
			</React.Fragment>
		);
	}
}

Counter.propTypes = {
	title: PropTypes.string,
	start: PropTypes.number
};

export {Counter};
