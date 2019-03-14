import React from 'react';
import injectSheet from 'react-jss';
import styles from './UserDropdown.styles';
import PersonIcon from '../../assets/img/Person';
import ChevronDown from '../../assets/img/ChevronDown';
import { getUserFromToken, deleteToken } from '../../services/auth.service';
import DropdownItem from '../DropdownItem/DropdownItem';
import { switchTheme, getCurrentThemeName, getAvailableThemes } from '../../ThemeSwitch';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  logout() {
    deleteToken();
    window.location.href = '/login';
  }

  render() {
    const { classes } = this.props;
    const currentThemeName = getCurrentThemeName();
    const availableThemes = getAvailableThemes();
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
            { availableThemes.map(theme =>
              <DropdownItem onClick={ () => switchTheme(theme) }>
                Theme {theme} { currentThemeName === theme ? '✓' : '' }
              </DropdownItem>
            ) }
            <DropdownItem onClick={ this.logout }>
              Abmelden
            </DropdownItem>
          </div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(UserDropdown);
