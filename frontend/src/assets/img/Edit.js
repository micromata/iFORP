import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
    <g fill="none" fillRule="evenodd">
      <path fill={color} d="M.5 22l.9-4.4 3.5 3.5z"/>
      <path stroke={color} strokeWidth="2" d="M3.5 15.5L16.9 2l3.6 3.6L7 19"/>
    </g>
  </svg>
);
