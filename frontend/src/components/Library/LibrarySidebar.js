import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './LibrarySidebar.styles';
import SearchBar from '../SearchBar/SearchBar';
import FilterChip from '../FilterChip/FilterChip';
import ElementGrid from '../ElementGrid/ElementGrid';
import ButtonTile from '../Button/ButtonTile';
import BackIcon from '../../assets/img/Back';
import LibraryZipUpload from '../Library/LibraryZipUpload';
import LibraryImagesUpload from '../Library/LibraryImagesUpload';
import { baseURL } from '../../utils';

class LibrarySidebar extends Component {
  constructor(props) {
    super(props);

    const htmlFilterFromLocalStorage = localStorage.getItem('iforp.library.html');
    const imagesFilterFromLocalStorage = localStorage.getItem('iforp.library.images');

    this.state = {
      expanded: false,
      htmlChecked: typeof(htmlFilterFromLocalStorage) === 'string' ?
        htmlFilterFromLocalStorage === '1' :
        true,
      imagesChecked: typeof(imagesFilterFromLocalStorage) === 'string' ?
        imagesFilterFromLocalStorage === '1' :
        true,
      searchTerm: ''
    };
  }

  handleHtmlFilterChange = () => {
    localStorage.setItem('iforp.library.html', this.state.htmlChecked ? '0' : '1');
    this.setState(prevState => ({htmlChecked: !prevState.htmlChecked}));
  }

  handleImageFilterChange = () => {
    localStorage.setItem('iforp.library.images', this.state.imagesChecked ? '0' : '1');
    this.setState(prevState => ({imagesChecked: !prevState.imagesChecked}));
  }

  handleSearchTermChanged = event => {
    this.setState({searchTerm: event.target.value});
  }

  handleToggleExpanded = () => {
    this.setState(prevState => ({expanded: !prevState.expanded}));
  }

  handleSelectFile = file => {
    this.props.onSelectItem(file.fileType, file.id);
  }

  render() {
    if (!this.props.directories) return null;

    const allFiles = this.props.directories
      .reduce((acc, dir) => [
        ...acc,
        ...dir.pages.map(p => ({...p, fileType: 'html'})),
        ...dir.images.map(p => ({...p, fileType: 'image'}))
      ], [])
      .sort((a, b) => a.name - b.name);

    const filesToRender = allFiles
      .filter(file => (this.state.htmlChecked && file.fileType === 'html') || (this.state.imagesChecked && file.fileType === 'image'))
      .filter(file => !this.state.searchTerm || file.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    const hasFiles = Boolean(allFiles.length);

    const getThumbnailPathForFile = file => {
      switch (file.fileType) {
        case 'html':
         return `${baseURL}/library/${file.thumbnailPath}`;
        case 'image':
         return `${baseURL}/library/images/${file.name}`;
        default:
         return null;
      }
    }

    return (
      <div className={ `${this.props.classes.LibrarySidebar} ${this.state.expanded ? 'expanded' : ''}` }>
        <div className={ this.state.expanded ? this.props.classes.CollapseIcon : this.props.classes.ExpandIcon} onClick={this.handleToggleExpanded}>
          <BackIcon color={ this.props.theme.textColor } />
        </div>
        <h3>Bibliothek</h3>
        { !hasFiles &&
          <React.Fragment>
            <p className={ this.props.classes.LibraryEmptyTeaser }>
              Du hast bisher noch keine Dateien in die Bibliothek geladen.
              <br />
              Bitte lade Deine HTML oder Bilddateien hoch, um aus ihnen auswählen zu können.
              <br />
              <span className='footnote'>Tipp: Du kannst neben .jpg, .png Dateien auch komplette .zip Dateien mit .html und .css auswählen.</span>
            </p>
            <div className='UploadButtons'>
              <LibraryZipUpload highlighted onZipFileSelected={ this.props.onZipFileSelected } />
              <LibraryImagesUpload highlighted onImagesSelected={ this.props.onImagesSelected } />
            </div>
          </React.Fragment>
        }
        { hasFiles &&
          <React.Fragment>
            <div className={ this.props.classes.LibrarySidebarFilter }>
              <SearchBar searchTerm={this.state.searchTerm} onChange={this.handleSearchTermChanged} />
              <FilterChip text='HTML' checked={this.state.htmlChecked} onCheckedChange={this.handleHtmlFilterChange} />
              <FilterChip text='Bilder' checked={this.state.imagesChecked} onCheckedChange={this.handleImageFilterChange} />
            </div>
            <ElementGrid leftAlign>
              { filesToRender.map(file =>
                <ButtonTile
                  id={ `file-${file.id}` }
                  key={ `${file.fileType}-${file.id}` }
                  titleBelow
                  TileImagePath={ getThumbnailPathForFile(file) }
                  onClick={ () => this.handleSelectFile(file) }
                  highlighted={ file.id === this.props.selectedItemId }
                  >
                    <span className={ this.props.classes.LibrarySidebarFilename }>{ file.name }</span>
                  </ButtonTile>
                )}
            </ElementGrid>
          </React.Fragment>
        }

      </div>
    )
  }
}

export default injectSheet(styles)(LibrarySidebar);
