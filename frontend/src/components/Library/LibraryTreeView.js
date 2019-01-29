import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './LibraryTreeView.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';
import ArrowRightIcon from '../../assets/img/ArrowRight';

class LibraryTreeView extends Component {
  constructor(props) {
    super(props);

    this.state = { expandedDirectory: null };
  }

  handleExpandDirectory = directoryId => {
    this.setState(prevState => ({ expandedDirectory: prevState.expandedDirectory ? null : directoryId }));
  }

  handleSelectPage = (event, pageId) => {
    event.stopPropagation();
    this.props.onSelectPage(pageId);
  }

  render() {
    if (!this.props.directories) return null;

    return (
      <div className={ this.props.classes.LibraryTreeView }>
        <ul>
          { this.props.directories.map(directory =>
            <li key={`directory-${directory.id}`} onClick={() => this.handleExpandDirectory(directory.id)}>
              { this.state.expandedDirectory === directory.id ?
                <ArrowDownIcon /> :
                <ArrowRightIcon />
              }
              { directory.name }
              { this.state.expandedDirectory === directory.id &&
                <ul>
                  { directory.pages.map(page =>
                    <li key={ `page-${page.id}` } onClick={event => this.handleSelectPage(event, page.id)}>
                      { page.name }
                    </li>
                  )}
                </ul>
              }
            </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default injectSheet(styles)(LibraryTreeView);
