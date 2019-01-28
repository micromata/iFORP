import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg
    width="13px"
    height="13px"
    viewBox="0 0 13 13"
    version="1.1"
  >
    <path
      d="M6.5 8l-4.6 4.5-1.4-1.4L5 6.5.5 1.9 1.9.5 6.5 5 11.1.5l1.4 1.4L8 6.5l4.6 4.6-1.4 1.4L6.5 8z"
      fill={ color }
      fillRule="evenodd"/>
  </svg>
);
