import React from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export class Header extends React.Component {

	state = {
		dropdownOpen: false
	};

	toggle = () => {
		this.setState({dropdownOpen: !this.state.dropdownOpen});
	}

	handleNewTemplatesClick = () => {
		console.log('handleNewTemplatesClick()');
	}

	render() {
		return (
			<div className="row text-center mb-4">
				<div className="col-2 text-left align-self-center">
					<Link to={`/whiteboards/project/${this.props.projectId}/whiteboard/${this.props.whiteboardId}`}><span className="oi oi-chevron-left"></span></Link>
				</div>
				<div className="col-8">
					<h1 className="h2">Bibliothek</h1>
				</div>
				<div className="col-2 text-right align-self-center">
					<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction="down">
						<DropdownToggle
							tag="a"
							onClick={this.toggle}
							aria-expanded={this.state.dropdownOpen}
						>
							<span className="oi oi-menu"></span>
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem onClick={this.handleNewTemplatesClick}>Upload new templates</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	projectId: PropTypes.string,
	whiteboardId: PropTypes.string
};
