import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="8px" height="12px" viewBox="0 0 8 12" version="1.1">
    <g fill="none" fillRule="evenodd">
      <path fill={ color } d="M.6 1.4L5.2 6 .6 10.6 2 12l6-6-6-6z"/>
      <path d="M-8 18V-6h24v24z"/>
    </g>
  </svg>
);
