import React from 'react';
import injectSheet from 'react-jss';
import SearchIcon from '../../assets/img/Search';
import TextInput from '../TextInput/TextInput';
import styles from './SearchBar.styles';

export const SearchBar = ({ classes, theme, searchTerm, onChange }) => (
  <div className={classes.SearchBar}>
    <SearchIcon color={ theme.textColorOnBackground } />
    <TextInput value={ searchTerm } onChange={ onChange }/>
  </div>
);

export default injectSheet(styles)(SearchBar);
