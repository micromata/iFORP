import React from 'react';

export default ({ color = '#FFFFFF', className = '', id = '' }) => (
  <svg
    width="23px"
    height="24px"
    viewBox="0 0 23 24"
    version="1.1"
    className={className}
    id={id}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-16.000000, -12.000000)" stroke={color}>
        <g>
          <g id="Icon/close/light" transform="translate(16.000000, 12.000000)">
            <g transform="translate(1.000000, 1.043478)">
              <polyline
                id="Rectangle-7"
                strokeWidth="2"
                transform="translate(20.606602, 11.067758) rotate(-45.000000) translate(-20.606602, -11.067758) "
                points="13.1066017 18.8938453 13.1066017 3.24167136 13.1066017 3.24167136 28.1066017 3.24167136"
              />
              <path
                d="M7.51469318,0.984652561 L0.443625371,8.3631581"
                id="Line"
                strokeWidth="2"
                strokeLinecap="square"
                transform="translate(3.979159, 4.673905) scale(1, -1) translate(-3.979159, -4.673905) "
              />
              <path
                d="M7.51469318,13.5498854 L0.443625371,20.9283909"
                id="Line"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
