import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="12" height="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.8 7.6L1 4.8l-1 1 3.8 3.8L12 1.4l-1-1z" fill={ color } fillRule="nonzero"/>
  </svg>
);
