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
    this.setState(prevState => ({ expandedDirectory: prevState.expandedDirectory === directoryId ? null : directoryId }));
  }

  handleSelectItem = (event, itemId) => {
    event.stopPropagation();
    this.props.onSelectItem(itemId);
  }

  render() {
    if (!this.props.directories) return null;

    const itemsKey = this.props.fileTypeFilter === 'html' ? 'pages' : 'images';


    return (
      <div className={ this.props.classes.LibraryTreeView }>
        <ul>
            { this.props.directories.
              filter(directory => directory[itemsKey] && directory[itemsKey].length)
              .map(directory =>
                <li key={`directory-${directory.id}`} onClick={() => this.handleExpandDirectory(directory.id)}>
                  { this.state.expandedDirectory === directory.id ?
                    <ArrowDownIcon color={ this.props.theme.textColorOnBackground }/> :
                    <ArrowRightIcon color={ this.props.theme.textColorOnBackground }/>
                  }
                  { directory.name }
                  { this.state.expandedDirectory === directory.id &&
                    <ul>
                      { directory[itemsKey].map(item =>
                        <li key={ `${itemsKey}-${item.id}` } onClick={event => this.handleSelectItem(event, item.id)}>
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
