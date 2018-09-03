import React from 'react';

export default ({ color = '#FFFFFF', className = '', id = '' }) => (
  <svg
    width="27px"
    height="7px"
    viewBox="0 0 27 7"
    version="1.1"
    className={className}
    id={id}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-1079.000000, -795.000000)" stroke={color}>
        <g transform="translate(1079.000000, 795.000000)">
          <g transform="translate(1.000000, 1.000000)">
            <circle strokeWidth="2" cx="2.5" cy="2.5" r="2.5" />
            <circle strokeWidth="2" cx="12.5" cy="2.5" r="2.5" />
            <circle strokeWidth="2" cx="22.5" cy="2.5" r="2.5" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
