import React from 'react';
import injectSheet from 'react-jss';
import styles from './LibraryFilter.styles';

export const LibraryFilter = ({classes, selectedFilter, onFilterChange}) => (
  <div className={ classes.LibraryFilter }>
    <input type="radio" id="library-filter" name="libary-filter" value="html" checked={selectedFilter === 'html'} onChange={() => onFilterChange('html')} />
    <label htmlFor="html" onClick={() => onFilterChange('html')}>HTML</label>
    <input type="radio" id="library-filter" name="libary-filter" value="images" checked={selectedFilter === 'images'} onChange={() => onFilterChange('images')} />
    <label htmlFor="images" onClick={() => onFilterChange('images')}>Images</label>
  </div>
);

export default injectSheet(styles)(LibraryFilter);
