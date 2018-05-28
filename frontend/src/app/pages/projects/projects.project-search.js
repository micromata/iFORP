import React from 'react';
import { PropTypes } from 'prop-types';

export const ProjectSearch = ({ searchTerm, onSearchInput }) => {
  const handleChange = event => onSearchInput(event.target.value);

  return (
    <div className="row">
      <form className="form-inline mt-2 ml-3 mb-3">
        <input
          className="form-control mr-sm-2"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

ProjectSearch.propTypes = {
  searchTerm: PropTypes.string,
  onSearchInput: PropTypes.func
};
