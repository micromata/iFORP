import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

export class Header extends React.Component {

	state = {
		dropdownOpen: false
	};

	toggle = () => {
		this.setState({dropdownOpen: !this.state.dropdownOpen});
	}

	handleNewWhiteboardClick = () => {
		return this.props.onCreateNewWhiteboard();
	}

	render() {
		const {project, currentWhiteboard, whiteboards} = this.props;

		return (
			<div className="row text-center mb-4">
				<div className="col-2 text-left align-self-center">
					<Link to="/"><span className="oi oi-x"></span></Link>
				</div>
				<div className="col-8">
					<h1 className="h2">{project.name} / {currentWhiteboard.name}</h1>
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
							<DropdownItem header>Available whiteboards</DropdownItem>
							{whiteboards.map(whiteboard => {
								return <DropdownItem
									key={whiteboard.id}
									tag={() => {
										return (
											<Link
												to={{
													pathname: `/whiteboards/project-id/${project.id}/whiteboard-id/${whiteboard.id}`,
													state: {whiteboard}
												}}
												className={`dropdown-item ${whiteboard.id === currentWhiteboard.id && 'active'}`}
											>
												{whiteboard.name}
											</Link>
										);
									}}
								>
									{whiteboard.name}
								</DropdownItem>;
							})}
							<DropdownItem divider />
							<DropdownItem onClick={this.handleNewWhiteboardClick}>Create new whiteboard</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	project: PropTypes.object,
	currentWhiteboard: PropTypes.object,
	whiteboards: PropTypes.array,
	onCreateNewWhiteboard: PropTypes.func
};
