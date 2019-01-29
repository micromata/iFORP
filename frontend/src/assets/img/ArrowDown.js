import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="12px" height="8px" viewBox="0 0 12 8" version="1.1">
    <g fill="none" fillRule="evenodd">
      <path fill={ color } d="M10.6.6L6 5.2 1.4.6 0 2l6 6 6-6z"/>
      <path d="M-6-8h24v24H-6z"/>
    </g>
  </svg>
);
