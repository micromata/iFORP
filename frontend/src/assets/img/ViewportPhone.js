import React from 'react';

export default ({ color = '#000' }) => (
  <svg width="19" height="32" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M14.8.6H3.6C1.6.6 0 2 0 4v24c0 1.9 1.6 3.5 3.6 3.5h11.2c2 0 3.6-1.6 3.6-3.6V4c0-1.9-1.6-3.4-3.6-3.4zM9.2 30.2a2.1 2.1 0 1 1 0-4.3 2.1 2.1 0 0 1 0 4.3zm6.3-5.7H3V4.8h12.6v19.7z" fill={ color } fillRule="nonzero"/>
      <path d="M-7-.8h33.8V33H-7z"/>
    </g>
  </svg>
);
