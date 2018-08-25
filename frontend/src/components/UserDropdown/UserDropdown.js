import React from 'react';
import injectSheet from 'react-jss';
import styles from './UserDropdown.styles';
import personIcon from '../../assets/img/icon-person.svg';
import chevronDown from '../../assets/img/icon-chevron-down.svg';
import { getUserFromToken, deleteToken } from '../../services/auth.service';
import DropdownItem from '../DropdownItem/DropdownItem';

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
    return (
      <div className={classes.UserDropdown}>
        <div
          className="dropdown-toggle"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <img src={chevronDown} alt="Open account actions" />
          <img
            src={personIcon}
            className={classes.AccountActions}
            alt="Account actions"
          />
          {getUserFromToken().username}
        </div>
        {this.state.isOpen && (
          <div className={classes.Drop}>
            <DropdownItem
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </DropdownItem>
          </div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(UserDropdown);
