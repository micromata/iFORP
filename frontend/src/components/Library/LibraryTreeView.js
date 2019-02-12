import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './LibraryTreeView.styles';
import ArrowDownIcon from '../../assets/img/ArrowDown';
import ArrowRightIcon from '../../assets/img/ArrowRight';

class LibraryTreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedDirectory: Number(window.localStorage.getItem('iforp.library.expandedDirectory')) || null,
      expandedDirectoryType: window.localStorage.getItem('iforp.library.selectedFilter') || null
    };
  }

  static getDerivedStateFromProps (props, state) {
    if (props.fileTypeFilter !== state.expandedDirectoryType) {
      return { expandedDirectory: null };
    }

    return null;
  }

  handleExpandDirectory = directoryId => {
    this.setState(
      prevState => ({
        expandedDirectory: prevState.expandedDirectory === directoryId ? -1 : directoryId,
        expandedDirectoryType: this.props.fileTypeFilter
      }),
      () => window.localStorage.setItem('iforp.library.expandedDirectory', this.state.expandedDirectory)
    );
  }

  handleSelectItem = (event, itemId) => {
    event.stopPropagation();
    this.props.onSelectItem(itemId);
  }

  render() {
    if (!this.props.directories) return null;
    const itemsKey = this.props.fileTypeFilter === 'html' ? 'pages' : 'images';
    const directoriesToRender = this.props.directories.filter(directory => directory[itemsKey] && directory[itemsKey].length);
    const directoryToExpand = typeof this.state.expandedDirectory === 'number' ?
      this.state.expandedDirectory :
      directoriesToRender[0] && directoriesToRender[0].id;

    return (
      <div className={ this.props.classes.LibraryTreeView }>
        <ul>
            { directoriesToRender
              .map(directory =>
                <li key={`directory-${directory.id}`} onClick={() => this.handleExpandDirectory(directory.id)}>
                  { directoryToExpand === directory.id ?
                    <ArrowDownIcon color={ this.props.theme.textColorOnBackground }/> :
                    <ArrowRightIcon color={ this.props.theme.textColorOnBackground }/>
                  }
                  { directory.name }
                  { directoryToExpand === directory.id &&
                    <ul>
                      { directory[itemsKey].map(item =>
                        <li
                          key={ `${itemsKey}-${item.id}` }
                          className={ `${this.props.selectedItemId === item.id ? 'selected' : '' }` }
                          onClick={event => this.handleSelectItem(event, item.id)}>
                          { item.name }
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
