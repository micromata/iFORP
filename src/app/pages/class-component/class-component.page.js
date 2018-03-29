import React from 'react';
import {Button} from 'reactstrap';

class ClassComponent extends React.Component {
	state = {count: 0}

	decrementIsDisabled = () => this.state.count === 0;

	decrement = () => {
		this.setState(state => ({count: state.count === 0 ? state.count : state.count - 1}));
	}

	increment = () => {
		this.setState({count: this.state.count + 1});
	}

	render() {
		return (
			<React.Fragment>
				<h3>Class Component</h3>
				<p>Count: {this.state.count}</p>
				<div className="btn-group">
					<Button disabled={this.decrementIsDisabled()} color="primary" onClick={this.decrement}>-</Button>
					<Button color="primary" onClick={this.increment}>+</Button>
				</div>
			</React.Fragment>
		);
	}
}

export {ClassComponent};
