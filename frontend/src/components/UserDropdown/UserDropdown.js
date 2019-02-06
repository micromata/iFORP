import React from 'react';
import injectSheet from 'react-jss';
import styles from './UserDropdown.styles';
import PersonIcon from '../../assets/img/Person';
import ChevronDown from '../../assets/img/ChevronDown';
import { getUserFromToken, deleteToken } from '../../services/auth.service';
import DropdownItem from '../DropdownItem/DropdownItem';
import { switchTheme } from '../../ThemeSwitch';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  changeThemeDark = () => switchTheme('dark');

  changeThemeLight = () => switchTheme('light');

  changeThemePurple = () => switchTheme('purple');

  logout() {
    deleteToken();
    window.location.href = '/login';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.UserDropdown}>
        <div
          className="dropdown-toggle"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <ChevronDown color={ this.props.theme.NavBar.textColor }/>
          <PersonIcon color={this.props.theme.NavBar.textColor } />
          {getUserFromToken().username}
        </div>
        {this.state.isOpen && (
          <div className={classes.Drop}>
            <DropdownItem onClick={ this.changeThemeDark }>
              Theme Dark
            </DropdownItem>
            <DropdownItem onClick={ this.changeThemeLight }>
              Theme Light
            </DropdownItem>
            <DropdownItem onClick={ this.changeThemePurple }>
              Theme Purple
            </DropdownItem>
            <DropdownItem onClick={ this.logout }>
              Logout
            </DropdownItem>
          </div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(UserDropdown);
