import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="22px" height="16px" viewBox="0 0 22 16" version="1.1">
    <g fill="none" fillRule="evenodd">
      <path d="M-1-4h24v24H-1z"/>
      <path d="M11 .5C6 .5 1.7 3.6 0 8a11.8 11.8 0 0 0 22 0C20.3 3.6 16 .5 11 .5zM11 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill={ color } fillRule="nonzero"/>
    </g>
  </svg>
);
