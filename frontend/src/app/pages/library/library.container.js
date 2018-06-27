import React from 'react';
import { PropTypes } from 'prop-types';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

import { FormatJson } from '../../shared/format-json'; // eslint-disable-line no-unused-vars
import { Header } from './shared/library.header';
import { http } from '../../base/http';
import { Treeview } from './library.treeview';
import { Iframe } from '../../shared/iframe';

export class Library extends React.Component {
  state = {
    view: null,
    directories: [],
    selectedPageId: null,
    selectedFile: {
      id: null,
      name: '',
      htmlElementAttributes: {},
      head: '',
      body: '',
      assets: []
    }
  };

  projectId = this.props.match.params.projectId;

  whiteboardId = this.props.match.params.whiteboardId;

  viewId = this.props.match.params.viewId;

  handlePageClick = pageId => {
    this.setState({ selectedPageId: pageId });
    this.getPage(pageId);
  };

  handleUploadClick = event => {
    event.preventDefault();
  };

  handleUseTemplateClick = async () => {
    await http.put(
      `projects/${this.projectId}/whiteboards/${this.whiteboardId}/views/${
        this.viewId
      }`,
      this.state.selectedFile
    );
    this.props.history.push(
      `/whiteboards/project/${this.projectId}/whiteboard/${this.whiteboardId}`
    );
  };

  getPage = async pageId => {
    const selectedFile = await http.get(`library/files/${pageId}`);
    /**
     * TODO: Remove null check after the backend implemented sending an array of htmlElementAttributes
     * This can the be reverted to:
     * ```
     * this.setState({selectedFile});
     * ```
     * Related to Issue: PROFI-36
     */
    this.setState({
      selectedFile: {
        ...selectedFile,
        htmlElementAttributes:
          selectedFile.htmlElementAttributes === null
            ? {}
            : selectedFile.htmlElementAttributes
      }
    });
  };

  async componentDidMount() {
    // Get ID from path parameters
    this.setState({ view: this.viewId });

    // Get directories and files from the backend
    const directories = await http.get('library/files');
    this.setState({ directories });
  }

  render() {
    return (
      <main id="" className="container">
        <Header
          backLink={`/whiteboards/project/${this.projectId}/whiteboard/${
            this.whiteboardId
          }`}
        />
        <div className="row">
          <div className="col-3">
            {this.state.directories.length ? (
              <Treeview
                onPageSelection={this.handlePageClick}
                directories={this.state.directories}
                selectedPageId={this.state.selectedPageId}
              />
            ) : (
              false
            )}
            <Link
              className="btn btn-secondary btn-sm"
              to={`/library/project/${this.projectId}/whiteboard/${
                this.whiteboardId
              }/view/${this.viewId}/upload`}
            >
              Neuen Inhalt hochladen
            </Link>
          </div>
          <div className="col-9">
            {this.state.selectedPageId ? (
              <Iframe
                htmlElementAttributes={
                  this.state.selectedFile.htmlElementAttributes
                }
                head={this.state.selectedFile.head}
                body={this.state.selectedFile.body}
                assets={this.state.selectedFile.assets}
                viewportSize="desktop"
              />
            ) : this.state.directories.length ? (
              <Alert color="info">
                Bitte wählen Sie in der linken Spalte einen Inhalt aus um
                fortzufahren.
              </Alert>
            ) : (
              <Alert color="warning">
                Bitte laden Sie zunächst Inhalte hoch um fortzufahren.
              </Alert>
            )}
            <div className="d-flex justify-content-end mt-3">
              <button
                onClick={this.handleUseTemplateClick}
                className="btn btn-primary"
                disabled={!this.state.selectedPageId}
              >
                Inhalt verwenden
              </button>
            </div>
          </div>
        </div>
        {/* <FormatJson
					view={this.state.view}
					selectedPageId={this.state.selectedPageId}
					selectedFile={this.state.selectedFile}
					directories={this.state.directories}
				></FormatJson> */}
      </main>
    );
  }
}

Library.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
