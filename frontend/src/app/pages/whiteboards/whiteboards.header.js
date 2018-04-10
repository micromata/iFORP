import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

export class Header extends React.Component {
	toggle = this.toggle.bind(this);

	state = {
		dropdownOpen: false
	};

	toggle() {
		this.setState({dropdownOpen: !this.state.dropdownOpen});
	}

	handleClick = whiteboard => {
		console.log('handleClick outer');
		console.log(whiteboard);
		this.props.onWhiteboardChange(whiteboard);
	};

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
					{/* <a href="#"><span className="oi oi-menu"></span></a> */}
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
									// active={whiteboard.id === currentWhiteboard.id}
									key={whiteboard.id}
									// onClick={this.handleClick}
									// tag={() => <Link to={`/whiteboards/project-id/${project.id}/whiteboard-id/${whiteboard.id}`} className={`dropdown-item ${whiteboard.id === currentWhiteboard.id && 'active'}`}>{whiteboard.name}</Link>}
									tag={() => <WhiteboardLink whiteboard={whiteboard} currentWhiteboard={currentWhiteboard} onClickWhiteboard={this.handleClick} />}
								>
									{whiteboard.name}
								</DropdownItem>;
							})}
							<DropdownItem divider />
							<DropdownItem>Create new whiteboard</DropdownItem>
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
	onWhiteboardChange: PropTypes.func
};

const WhiteboardLink = ({whiteboard, currentWhiteboard, onClickWhiteboard}) => {
	console.log('whiteboard', whiteboard);
	console.log('currentWhiteboard', currentWhiteboard);

	const handleClick = (event) => {
		event.preventDefault();
		console.log('handleClick');
		console.log(whiteboard);
		onClickWhiteboard(whiteboard);
	};

	return <a href="#" onClick={handleClick} className={`dropdown-item ${whiteboard.id === currentWhiteboard.id && 'active'}`}>{whiteboard.name}</a>;
	return <a href="#" onClick={handleClick} className={`dropdown-item ${whiteboard.id === currentWhiteboard.id && 'active'}`}>{whiteboard.name}</a>;
};

WhiteboardLink.propTypes = {
	whiteboard: PropTypes.object,
	currentWhiteboard: PropTypes.object,
	onClickWhiteboard: PropTypes.func
};
