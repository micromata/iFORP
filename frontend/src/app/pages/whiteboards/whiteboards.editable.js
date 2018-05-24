import React from 'react';
import {PropTypes} from 'prop-types';
import {FormatJson} from '../../shared/format-json'; // eslint-disable-line no-unused-vars

export class Editable extends React.Component {

	state = {
		editMode: false,
		value: undefined
	}

	handleClick = () => {
		this.setState({editMode: true}, () => {
			this.input.focus();
		});
	};

	handleChange = (event) => {
		this.setState({value: event.target.value});
	}

	handleValueUpdate = (event) => {
		event.preventDefault();
		this.setState({editMode: false});
		this.props.onChange(this.state.value);
	};

	componentDidUpdate(prevProps) {
		if (!prevProps.text) {
			this.setState({value: this.props.text});
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.text === prevState.text) {
			return null;
		}
		return {
			...prevState,
			value: nextProps.text
		};
	}

	componentDidMount() {
		if (this.props.text) {
			this.setState({value: this.props.text});
		}
	}

	render() {
		return (
			<React.Fragment>
				<span onClick={this.handleClick} className="editable-container">
					{this.state.editMode === false ?
						<React.Fragment>
							<span className="editable-text">{this.state.value}</span>
							<button className="btn btn-link editable-button">
								<span className="oi oi-pencil editable-icon"></span>
							</button>
						</React.Fragment> :
						<form className="editable-form form-inline" onSubmit={this.handleValueUpdate}>
							<input
								className="form-control"
								onChange={this.handleChange}
								onBlur={this.handleValueUpdate}
								type="text"
								defaultValue={this.state.value}
								ref={(input) => {
									this.input = input;
								}}
							/>
						</form>
					}
				</span>
				{/* <FormatJson state={this.state}></FormatJson> */}
			</React.Fragment>
		);
	}

}

Editable.propTypes = {
	text: PropTypes.string,
	onChange: PropTypes.func
};
