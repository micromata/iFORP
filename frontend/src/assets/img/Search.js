import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <g transform="translate(1 1)" stroke={color} strokeWidth="2" fill="none" fillRule="evenodd">
      <circle cx="8" cy="8" r="8"/>
      <path d="M15 15l6 6" strokeLinecap="square"/>
    </g>
  </svg>
);
