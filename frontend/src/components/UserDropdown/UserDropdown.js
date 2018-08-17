import React from 'react';
import injectSheet from 'react-jss';
import styles from './UserDropdown.styles';
import personIcon from '../../assets/img/icon-person.svg';
import chevronDown from '../../assets/img/icon-chevron-down.svg';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { classes, userName } = this.props;
    return (
      <div className={classes.UserDropdown}>
        <div
          onClick={event => this.setState({ isOpen: !this.state.isOpen })}
        >
          <img src={chevronDown} alt="Open account actions" />
          <img
            src={personIcon}
            className={classes.AccountActions}
            alt="Account actions"
          />
          {userName}
        </div>
        { (this.state.isOpen) &&
          <div className={classes.Drop}>
            <ul>
              <li>
              <a href="" onClick={this.logout}>Logout</a>
              </li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default injectSheet(styles)(UserDropdown);
