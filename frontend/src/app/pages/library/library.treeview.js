import React from 'react';
import { PropTypes } from 'prop-types';
import { Collapse } from 'reactstrap';

import { FormatJson } from '../../shared/format-json'; // eslint-disable-line no-unused-vars

export class Treeview extends React.Component {
  state = {
    collapsed: {}
  };

  handleDirectoryClick = (event, directoryId) => {
    event.preventDefault();
    this.setState({
      collapsed: {
        ...this.state.collapsed,
        [directoryId]: this.state.collapsed[directoryId] === false
      }
    });
  };

  handlePageClick = (event, pageId) => {
    event.preventDefault();
    return this.props.onPageSelection(pageId);
  };

  componentDidMount() {
    const initialCollapsedState = {};
    this.props.directories.forEach((directory, index) => {
      initialCollapsedState[directory.id] = index === 0;
    });

    this.setState({ collapsed: initialCollapsedState });
  }

  render() {
    return (
      <React.Fragment>
        <ul className="list-unstyled">
          {this.props.directories.map(directory => {
            return (
              <li key={directory.id}>
                <a
                  href="#"
                  className="treeview-link"
                  onClick={event =>
                    this.handleDirectoryClick(event, directory.id)
                  }
                >
                  <span
                    className={`treeview-icon oi mr-1 oi-folder ${this.state
                      .collapsed[directory.id] && 'opened'}`}
                  />
                  {directory.name}
                </a>
                <Collapse isOpen={this.state.collapsed[directory.id]}>
                  <ul className="list-unstyled treeview-pages-list">
                    {directory.pages.map(page => {
                      return (
                        <li key={page.id}>
                          <a
                            href="#"
                            className={`treeview-link ${
                              this.props.selectedPageId === page.id
                                ? 'active'
                                : ''
                            }`}
                            onClick={event =>
                              this.handlePageClick(event, page.id)
                            }
                          >
                            <span className={`treeview-icon oi mr-1 oi-file`} />
                            {page.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </Collapse>
              </li>
            );
          })}
        </ul>
        {/* <FormatJson state={this.state}></FormatJson> */}
      </React.Fragment>
    );
  }
}

Treeview.propTypes = {
  directories: PropTypes.array,
  onPageSelection: PropTypes.func,
  selectedPageId: PropTypes.number
};
