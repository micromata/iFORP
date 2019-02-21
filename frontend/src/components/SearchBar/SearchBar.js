import React from 'react';
import injectSheet from 'react-jss';
import SearchIcon from '../../assets/img/Search';
import TextInput from '../TextInput/TextInput';
import styles from './SearchBar.styles';

export const SearchBar = ({ classes, searchTerm, onChange, light }) => (
  <div className={`${classes.SearchBar} ${light ? 'light': ''}`}>
    <TextInput value={ searchTerm } onChange={ onChange }/>
    <SearchIcon />
  </div>
);

export default injectSheet(styles)(SearchBar);
