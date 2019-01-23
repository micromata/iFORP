import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
    <path d="M14 8H8v6H6V8H0V6h6V0h2v6h6z" fill={ color } fillRule="evenodd"/>
  </svg>
);
