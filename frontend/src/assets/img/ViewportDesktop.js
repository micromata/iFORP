import React from 'react';

export default ({ color = '#000' }) => (
  <svg width="48" height="44" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M-2-4h51.5v51.5H-2z"/>
      <path d="M43 .3H4.5C2.1.3.1 2.3.1 4.6v25.8c0 2.3 2 4.3 4.3 4.3h15v4.2h-4.2v4.3h17.2V39H28v-4.2h15c2.4 0 4.3-2 4.3-4.3V4.6c0-2.4-2-4.3-4.3-4.3zm0 30H4.5V4.7h38.7v25.8z" fill={ color } fillRule="nonzero"/>
    </g>
  </svg>
);
