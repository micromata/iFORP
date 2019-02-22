import React from 'react';

export default ({ color = '#000' }) => (
  <svg width="27" height="34" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.2.2H3.5C1.5.2 0 1.7 0 3.7v26.8C0 32.4 1.6 34 3.5 34h19.7c2 0 3.6-1.6 3.6-3.5V3.7c0-2-1.6-3.5-3.6-3.5zm-9.8 32.4a2.1 2.1 0 1 1 0-4.3 2.1 2.1 0 0 1 0 4.3zM24 26.9H2.8V4.4H24v22.5z"
      fill={ color } fillRule="nonzero"/>
  </svg>
);
