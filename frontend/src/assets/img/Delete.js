import React from 'react';

export default ({ color = '#FFFFFF' }) => (
  <svg width="17px" height="24px" viewBox="0 0 17 24" version="1.1">
    <g strokeWidth="2" stroke={color} fill="none" fillRule="evenodd">
      <path d="M2 5l1 17M3.5 22h10" strokeLinecap="square"/>
      <path d="M1 5h15M1 2h15"/>
      <path d="M6 8.5v10M11 8.5v10" strokeLinecap="square"/>
      <path d="M8.5 0v1"/>
      <path d="M15 5l-1 17" strokeLinecap="square"/>
    </g>
  </svg>
);
